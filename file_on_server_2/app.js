const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();


// Middleware để phân tích các request body dưới dạng JSON
app.use(bodyParser.json());

// Thiết lập CORS
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const dbConfig = JSON.parse(process.env.dbConfig);

// Tạo một pool kết nối
const pool = mysql.createPool(dbConfig);

// Tạo token khi đăng nhập thành công và lưu vào cơ sở dữ liệu
const generateToken = async (username) => {
    const token = crypto.randomBytes(32).toString('hex');

    try {
        // Lấy một kết nối từ pool
        const connection =  await pool.getConnection();
        
        const tokenCreatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        const [rows, fields] = await connection.execute(
            "UPDATE m_account SET token = ?, token_created_at = ? WHERE username = ?",
            [token, tokenCreatedAt, username]
        );
        connection.release();
    } catch (err) {
        console.error('Lỗi khi cập nhật token vào cơ sở dữ liệu:', err);
    }

    return token;
}

// Kiểm tra và xác minh token
const verifyToken = async (token) => {
    try {
        // Lấy một kết nối từ pool
        const connection = await pool.getConnection();
        
        const [rows, fields] = await connection.execute(
            "SELECT * FROM m_account WHERE token = ? AND token_created_at >= DATE_SUB(NOW(), INTERVAL 1 DAY)",
            [token]
        );
        
        connection.release();

        if (rows && rows.length > 0) {
            return rows[0].accountid;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
    }
}

// Xác thực token
const authenticate = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
        return;
    }
    const accountid = await verifyToken(token.replace('Bearer ', ''));
    if (!accountid) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
        return;
    }
    req.accountid = accountid;
    
    next();
}

const handleInsertResult = (result) => {
    if (result && result.affectedRows === 1) {
        return {
            success: true,
            message: "Insert successful",
        };
    } else {
        return {
            success: false,
            message: "Insert failed"
        };
    }
};

// Đăng nhập
app.post('/api/signin', async (req, res) => {
    const userData = req.body;
    if (userData.username && userData.password) {
        const username = userData.username;
        const password = userData.password;
    
        try {
            // Lấy một kết nối từ pool
            const connection = await pool.getConnection();
            
            const [rows, fields] = await connection.execute(
                "SELECT * FROM m_account WHERE username = ?",
                [username]
            );

            if (rows && rows.length > 0) {
                const hashed_password_saved = rows[0].password;
                if (bcrypt.compareSync(password, hashed_password_saved)) {
                    const token = await generateToken(username);
                    res.json({token});
                } else {
                    res.status(401).json({ status: 'error', message: 'Invalid password' });
                }
            } else {
                res.status(404).json({ status: 'error', message: 'Invalid username' });
            }
            connection.release();
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: err });
        }
    } else {
        res.status(400).json({ status: 'error', message: 'Missing username or password' });
    }
});

// Đăng ký
app.post('/api/signup', async (req, res) => {
    // Lấy dữ liệu từ yêu cầu
    const userData = req.body;

    // Kiểm tra xem username và password có tồn tại không
    if (userData.username && userData.password) {
        const username = userData.username;
        const password = userData.password;
        
        try {
            // Lấy một kết nối từ pool
            const connection = await pool.getConnection();
            
            const [rows, fields] = await connection.execute(
                'SELECT * FROM `m_account` WHERE username = ?',
                [username]
            );
    
            if (rows.length > 0) {
                res.status(409).json({ status: 'error', message: 'Existed username' });
                
            } else {
                // Người dùng chưa tồn tại, thêm vào cơ sở dữ liệu
                const name = userData.name || 'Your Name';
                const email = userData.email || null;
                const dob = userData.dob || null;
                const phone = userData.phone || null;
                const address = userData.address || null;

                try {
                    const hashedPassword = bcrypt.hashSync(password, 10); // Sử dụng bcrypt để băm mật khẩu
                    const [result, fields] = await connection.execute(
                        `INSERT INTO m_account (username, password, name, email, phone, address, birthday) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [username, hashedPassword, name, email, phone, address, dob]
                    );
                    const response = handleInsertResult(result);
                    
                    if (response.success) res.status(200).json({ status: 'success', message: response });
                    else res.status(500).json({ status: 'error', message: response });
                } catch (err) {
                    res.status(500).json({ status: 'error', message: err });
                }
            }
            
            connection.release();
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Failed to create user'});
        }
    } else {
        res.status(400).json({ status: 'error', message: 'Missing username or password' });
    }
});

// Cập nhật thông tin người dùng
app.put('/api/update', authenticate, async (req, res) => {
    const newData = req.body;

    if (Object.keys(newData).length > 0) {
        try {
            const accountid = req.accountid;

            let updateQuery = 'UPDATE m_account SET';
            const updateValues = [];

            Object.keys(newData).forEach(key => {
                if (key !== 'username') { 
                    if (key === 'password') {
                        updateQuery += ` ${key} = ?,`;
                        updateValues.push(bcrypt.hashSync(newData[key], 10));
                    } 
                    else if (key === 'isShoper') {
                        updateQuery += ` ${key} = ?,`;
                        updateValues.push(newData[key] === 'true');
                    } else {
                        updateQuery += ` ${key} = ?,`;
                        updateValues.push(newData[key]);
                    }
                }
            });

            updateQuery = updateQuery.slice(0, -1) + ' WHERE accountid = ?';
            updateValues.push(accountid);

            const connection = await pool.getConnection();
        
            const [result, fields] = await connection.execute(
                updateQuery,
                updateValues
            );

            if (result && result.affectedRows === 1)
                res.status(200).json({ message: 'Updated successfully' });
            else res.status(500).json({ error: 'Updated fail' });
            
            connection.release();
        } catch (error) {
            console.error('Updated fail:', error);
            res.status(500).json({ error: 'Updated fail' });
        }
    } else {
        res.status(400).json({ error: 'None infor' });
    }
});

// Lấy thông tin người dùng
app.get('/api/getuserinfo', authenticate, async (req, res) => {
    const accountid = req.accountid;
    try {
        const connection = await pool.getConnection();

        const [rows, fields] = await connection.execute(
            "SELECT username, name, email, phone, address, birthday, isShoper FROM m_account WHERE accountid = ?",
            [accountid]
        );

        if (rows.length === 1) 
            res.status(200).json( rows[0] );
        else res.status(500).json({ error: 'Get infor fail' });

        connection.release();
    } catch (error) {
        console.error('Get infor fail:', error);
        res.status(500).json({ error: 'Get infor fail' });
    }
});

// Lấy thông tin tất cả loại sản phẩm
app.get('/api/getproductcategory', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [rows, fields] = await connection.execute(
            "SELECT * FROM m_productCategory"
        );

        res.status(200).json( rows );

        connection.release();
    } catch (error) {
        console.error('Get category fail:', error);
        res.status(500).json({ error: 'Get category fail' });
    }
});

// Tìm thông tin sản phẩm theo tên hoặc loại hoặc shop
app.get('/api/findproduct', async (req, res) => {
    try {
        const categoryId = req.query.categoryId;
        const shopId = req.query.shopId;
        const productName = req.query.name;
        
        const getImagesByProductId = async (productId) => {
            const connection = await pool.getConnection();
            const [images] = await connection.execute(
                "SELECT * FROM m_productImage WHERE productId = ?",
                [productId]
            );
            connection.release();
            if (images.length === 1) {
                const { image1, image2, image3, image4, image5, image6 } = images[0];
                const result = {};
                if (image1) result.image1 = image1;
                if (image2) result.image2 = image2;
                if (image3) result.image3 = image3;
                if (image4) result.image4 = image4;
                if (image5) result.image5 = image5;
                if (image6) result.image6 = image6;
                return { images: result };
            }
            return { images: {} }; // Trả về object rỗng nếu không có hình ảnh
        };
        
        if (categoryId) {
            const connection = await pool.getConnection();

            const [products] = await connection.execute(
                "SELECT * FROM m_product WHERE categoryID = ?",
                [categoryId]
            );

            if (products.length===0) 
                res.status(404).json( {msg:"No product found"} );
            else {
                for (let product of products) {
                    const images = await getImagesByProductId(product.productID);
                    console.log(images);
                    product.images = images.images;
                }
                res.status(200).json( products );
            }
            connection.release();  
        } 
        
        else if (productName) {
            const connection = await pool.getConnection();

            const [products] = await connection.execute(
                'SELECT * FROM m_product WHERE name LIKE ?',
                [`%${productName}%`]
            );

            if (products.length===0) 
                res.status(404).json( {msg:"No product found"} );
            else {
                for (let product of products) {
                    const images = await getImagesByProductId(product.productID);
                    console.log(images);
                    product.images = images.images;
                }
                res.status(200).json( products );
            }
            connection.release();  
        }
        
        else if (shopId) {
            const connection = await pool.getConnection();

            const [products] = await connection.execute(
                'SELECT * FROM m_product WHERE shoperID = ?',
                [shopId]
            );

            if (products.length===0) 
                res.status(404).json( {msg:"No product found"} );
            else {
                for (let product of products) {
                    const images = await getImagesByProductId(product.productID);
                    console.log(images);
                    product.images = images.images;
                }
                res.status(200).json( products );
            }
            connection.release();  
        }
        else {
            res.status(400).json({ error: 'Missing categoryId or name or shopId' });
        }
    } catch (error) {
        console.error('Get product fail:', error);
        res.status(500).json({ error: error });
    }
});

// Thêm thông tin sản phẩm
app.post('/api/addproduct', authenticate, async (req, res) => {
    const accountid = req.accountid;
    try {
        const connection = await pool.getConnection();

        const [rows, fields] = await connection.execute(
            "SELECT * FROM m_shoper WHERE accountid = ?",
            [accountid]
        );

        if (rows.length === 1) {
            const shoperId= rows[0].shoperID;
            
            const productData = req.body;
            const name = productData.name ;
            const quantity = productData.quantity;
            const price = productData.price;
            const categoryId = productData.categoryId;
            
            const images = productData.images;
            
            if (name && quantity && price && Object.keys(images).length > 0 && categoryId)   {
                
                const [result, fields] = await connection.execute(
                    `INSERT INTO m_product (name, quantity, price, categoryId, shoperId) VALUES (?, ?, ?, ?, ?)`,
                    [name, quantity, price, categoryId, shoperId]
                );
                
                if (handleInsertResult(result).success) {
                    const productId = result.insertId; 
                    let imageValues = [];
                
                    for (let i = 1; i <= 6; i++) {
                        const imageURL = images[`image${i}`];
                        imageValues.push(imageURL || null); // Nếu không có giá trị imageURL, đưa vào null
                    }
                
                    const sql = `INSERT INTO m_productImage (productID, image1, image2, image3, image4, image5, image6) VALUES (?,?,?,?,?,?,?)`;
                    const insertValues = [productId, ...imageValues];
                
                    // Thực hiện INSERT
                    await connection.execute(sql, insertValues);
                
                    res.status(200).json({ success: true, productId: productId });
                } else {
                    res.status(500).json({ error: 'Add product fail' });
                }
                
            } else {
                res.status(400).json({ error: 'Not enough info to add a product' , images: images.length > 0});
            }
        }
        else res.status(403).json({ error: 'Unauthorized to add a product' });

        connection.release();
    } catch (error) {
        console.error('Add product fail:', error);
        res.status(500).json({ error: 'Add product fail' });
    }
});





// Khởi động server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

