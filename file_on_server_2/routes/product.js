const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const {authenticate, getImagesByProductId, checkImagesFields} = require('../func');

// Lấy thông tin tất cả loại sản phẩm
router.get('/get/categories', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [categories] = await connection.execute(
            "SELECT * FROM m_productcategory"
        );
        
        connection.release();
        return res.status(200).json( {msg:'success',categories} );
    } catch (error) {
        console.error('Get category fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Tìm thông tin sản phẩm theo tên hoặc loại hoặc shop hoặc productId
router.get('/find', async (req, res) => {
    try {
        const categoryId = req.query.categoryId;
        const shopId = req.query.shopId;
        const productName = req.query.name;
        const productId = req.query.productId;
        
        // Kiểm tra khóa tìm kiếm
        if (!categoryId && !shopId && !productName && !productId) return res.status(400).json({ error: 'Missing categoryId, shopId, productId or name' });
        
        // Tìm kiếm theo categoryId
        if (categoryId) {
            const connection = await pool.getConnection();

            const [products] = await connection.execute(
                "SELECT * FROM m_product WHERE categoryID = ?",
                [categoryId]
            );

            // Không tìm thấy sản phẩm nào
            if (products.length===0) {
                connection.release();  
                return res.status(404).json( {msg:"No product found"} );
            }
            
            // Tìm thấy sản phẩm, tiếp tục lấy ảnh của mỗi sản phẩm đã tìm thấy
            for (let product of products) {
                const images = await getImagesByProductId(product.productID);
                product.images = images.images;
            }
            
            connection.release();  
            return res.status(200).json( {msg:'success', products } );
        } 
        
        // Tìm kiếm theo name (1 phần tên của sản phẩm)
        if (productName) {
            const connection = await pool.getConnection();

            const [products] = await connection.execute(
                'SELECT * FROM m_product WHERE name LIKE ?',
                [`%${productName}%`]
            );
            
            // Không tìm thấy sản phẩm nào
            if (products.length===0) {
                connection.release();  
                return res.status(404).json( {msg:"No product found"} );
            }

            // Tìm thấy sản phẩm, tiếp tục lấy ảnh của mỗi sản phẩm đã tìm thấy
            for (let product of products) {
                const images = await getImagesByProductId(product.productID);
                product.images = images.images;
            }
            
            connection.release();  
            return res.status(200).json( {msg:'success', products } );
        }
        
        // Tìm kiếm theo shop
        if (shopId) {
            const connection = await pool.getConnection();

            const [products] = await connection.execute(
                'SELECT * FROM m_product WHERE shoperID = ?',
                [shopId]
            );
            
            // Không tìm thấy sản phẩm nào
            if (products.length===0) {
                connection.release();  
                return res.status(404).json( {msg:"No product found"} );
            }
            
            // Tìm thấy sản phẩm, tiếp tục lấy ảnh của mỗi sản phẩm đã tìm thấy
            for (let product of products) {
                const images = await getImagesByProductId(product.productID);
                product.images = images.images;
            }
            
            connection.release();  
            return res.status(200).json( {msg:'success', products } );
        }

        // Tìm kiếm theo productId
        if (productId) {
            const connection = await pool.getConnection();

            const [product] = await connection.execute(
                'SELECT * FROM m_product WHERE productId = ?',
                [productId]
            );
            
            // Không tìm thấy sản phẩm
            if (product.length===0) {
                connection.release();  
                return res.status(404).json( {msg:"Not found this product"} );
            }
            
            // Tìm thấy sản phẩm, tiếp tục lấy ảnh của sản phẩm đã tìm thấy
            const images = await getImagesByProductId(product[0].productID);
            product[0].images = images.images;
            
            connection.release();  
            return res.status(200).json( {msg:'success', product:product[0] } );
        }
    } catch (error) {
        console.error('Get product fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Thêm thông tin sản phẩm
router.post('/add', authenticate, async (req, res) => {
    const accountId = req.accountId;
    try {
        const connection = await pool.getConnection();

        // Kiểm tra user có quyền của shop không
        const [rows] = await connection.execute(
            "SELECT * FROM m_shoper WHERE accountId = ?",
            [accountId]
        );
        if (rows.length === 0) {
            connection.release();
            return res.status(403).json({ error: 'Unauthorized to add a product' });
        }
        
        // Đọc data từ request
        const shoperId    = rows[0].shoperID;
        const productData = req.body;
        const name        = productData.name ;
        const quantity    = productData.quantity;
        const price       = productData.price;
        const categoryId  = productData.categoryId || 3;
        const images      = productData.images;
        const description = productData.description;

        if (!name) {
            connection.release();
            return res.status(400).json({ error: 'Missing name of new product' });
        }
        if (!quantity) {
            connection.release();
            return res.status(400).json({ error: 'Missing quantity of new product' });
        }                    
        if (!price) {
            connection.release();
            return res.status(400).json({ error: 'Missing price of new product' });
        }                        
        if (Object.keys(images).length === 0) {
            connection.release();
            return res.status(400).json({ error: 'Missing images of new product' });
        }
    
        // Kiểm tra sản phẩm này đã có ở trên shop của user này chưa
        const [findProductOfThisShop] = await connection.execute(
            `SELECT * FROM m_product WHERE name = ? AND shoperID = ? `,
            [name,shoperId]
        );
        if (findProductOfThisShop.length === 1) {
            connection.release();
            return res.status(409).json({ error: 'This product existed on your shop' });
        }
        
        // Đủ điều kiện để thêm sản phẩm
        const [result] = await connection.execute(
            `INSERT INTO m_product (name, quantity, price, categoryId, shoperId,description) VALUES (?, ?, ?, ?, ?, ?)`,
            [name, quantity, price, categoryId, shoperId, description]
        );
        
        // Tiếp tục thực hiện INSERT images sau khi hành động INSERT product thành công
        const productId = result.insertId; 
        let imageValues = [];
        for (let i = 1; i <= 6; i++) {
            const imageURL = images[`image${i}`];
            imageValues.push(imageURL || null); // Nếu không có giá trị imageURL, đưa vào null
        }
        const sql = `INSERT INTO m_productimage (productID, image1, image2, image3, image4, image5, image6) VALUES (?,?,?,?,?,?,?)`;
        const insertValues = [productId, ...imageValues];
        await connection.execute(sql, insertValues);
        connection.release();
        return res.status(201).json({ msg: 'success', productId: productId });
    } catch (error) {
        console.error('Add product fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Cập nhật thông tin sản phẩm
router.put('/update', authenticate, async (req, res) => {
    const accountId = req.accountId;
    try {
        const connection = await pool.getConnection();

        // Kiểm tra user có quyền của shop không
        const [rows] = await connection.execute(
            "SELECT * FROM m_shoper WHERE accountId = ?",
            [accountId]
        );
        if (rows.length === 0) {
            connection.release();
            return res.status(403).json({ error: 'Unauthorized to update a product' });
        }
        const shoperId    = rows[0].shoperID;
        
        // Đọc data từ request
        const productData = req.body;
        const productId   = productData.productId;
        const name        = productData.name ;
        const quantity    = productData.quantity;
        const price       = productData.price;
        const categoryId  = productData.categoryId;
        const images      = productData.images;
        const description = productData.description;

        // Kiểm tra productId có được đính kèm không
        if (!productId) {
            connection.release();
            return res.status(400).json({error: 'Missing productId'})
        }

        // Kiểm tra có data để cập nhật không
        if (!name && !quantity && !price && !categoryId && !checkImagesFields(images,6) && !description) {
            connection.release();
            return res.status(400).json({error: 'No data to update'})
        }

        // Kiểm tra sản phẩm này có thuộc shop này không
        const [findProductOfThisShop] = await connection.execute(
            `SELECT * FROM m_product WHERE productId = ? AND shoperID = ? `,
            [productId,shoperId]
        );
        if (findProductOfThisShop.length === 0) {
            connection.release();
            return res.status(403).json({ error: 'You do not have permission to modify this product' });
        }

        // Cập nhật product nếu có dữ liệu
        if (name || quantity || price || categoryId || description) {
            // Chuẩn bị câu truy vấn
            let updateQuery = "UPDATE m_product SET ";
            let updateValues = [];
            if (name) {
                updateQuery += "name = ?, ";
                updateValues.push(name);
            }
            if (quantity) {
                updateQuery += "quantity = ?, ";
                updateValues.push(quantity);
            }
            if (price) {
                updateQuery += "price = ?, ";
                updateValues.push(price);
            }
            if (categoryId) {
                updateQuery += "categoryId = ?, ";
                updateValues.push(categoryId);
            }
            if (description) {
                updateQuery += "description = ?, ";
                updateValues.push(description);
            }
            updateQuery = updateQuery.slice(0, -2);
            updateQuery += " WHERE productId = ?";
            updateValues.push(productId);

            // Thực hiện cập nhật product 
            await connection.execute(updateQuery, updateValues);
        }
        
        // Tiếp tục cập nhật images nếu có
        if (checkImagesFields(images,6)) {
            // Chuẩn bị câu truy vấn
            let updateQuery = "UPDATE m_productimage SET ";
            let updateValues = [];
            for (let i = 1; i <= 6; i++) {
                const fieldName = `image${i}`;
                if (images.hasOwnProperty(fieldName)) {
                    updateQuery += `${fieldName} = ?, `;
                    updateValues.push(images[fieldName]);
                }
            }
            updateQuery = updateQuery.slice(0, -2);
            updateQuery += " WHERE productId = ?";
            updateValues.push(productId);

            // Thực hiện cập nhật images
            await connection.execute(updateQuery, updateValues);
        }

        connection.release();
        return res.status(200).json({ msg: 'success' });
    } catch (error) {
        console.error('Update product fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Xóa sản phẩm
router.delete('/remove',authenticate, async (req,res) => {
    const accountId = req.accountId;
    const productId = req.body.productId;
    if (!productId) return res.status(400).json({msg: 'Missing productId'});
    try {
        const connection = await pool.getConnection();

        // Kiểm tra user có quyền của shop không
        const [rows] = await connection.execute(
            "SELECT * FROM m_shoper WHERE accountId = ?",
            [accountId]
        );
        if (rows.length === 0) {
            connection.release();
            return res.status(403).json({ error: 'Unauthorized to remove a product' });
        }
        const shoperId = rows[0].shoperID;

        // Kiểm tra sản phẩm này có thuộc shop này không
        const [findProductOfThisShop] = await connection.execute(
            `SELECT * FROM m_product WHERE productId = ? AND shoperID = ? `,
            [productId,shoperId]
        );
        if (findProductOfThisShop.length === 0) {
            connection.release();
            return res.status(403).json({ error: 'You do not have permission to remove this product' });
        }

        // Thực hiện xóa product
        await connection.execute(
            'DELETE FROM m_productimage WHERE productId = ?',
            [productId]
        );
        await connection.execute(
            'DELETE FROM m_product WHERE productId = ?',
            [productId]
        );

        connection.release;
        return res.status(200).json({ msg: 'success' });
    } catch (error) {
        console.error('Remove product fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;