const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const {authenticate } = require('../func');

// Thêm sản phẩm vào giỏ hàng
router.post('/add', authenticate, async (req,res) => {
    const accountId = req.accountId;
    const productId = req.body.productId;
    const quantity  = parseInt(req.body.quantity, 10);
    if (!productId)    return res.status(400).json({ error:'Missing productId' });
    if (!quantity)     return res.status(400).json({ error:'Missing quantity'  });
    if (quantity <=0 ) return res.status(400).json({ error:'Invalid quantity'  });
    
    try {
        const connection = await pool.getConnection();

        // Kiểm tra sự tồn tại của sản phẩm trên sàn
        const [rows] = await connection.execute(
            "SELECT * FROM m_product WHERE productId = ?",
            [productId]
        );
        if (rows.length === 0) {
            connection.release();
            return res.status(404).json({error:'Product not found'})
        }
        
        // Tìm sản phẩm này trong giỏ hàng của user
        const [findExistCart] = await connection.execute(
            "SELECT * FROM m_cart WHERE accountId = ? AND productID = ?",
            [accountId,productId]
        );
        
        // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
        if (findExistCart.length != 0) {
            const newQuantity = findExistCart[0].quantity + quantity;

            await connection.execute(
                "UPDATE m_cart SET quantity = ? WHERE accountId = ? AND productID = ?",
                [newQuantity, accountId, productId]
            );
            
            connection.release();
            return res.status(200).json({ msg: 'Product quantity updated in cart' });
        }

        // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới
        await connection.execute(
            "INSERT INTO m_cart (accountId, productID, quantity) VALUES (?, ?, ?)",
            [accountId, productId, quantity]
        );
        
        connection.release();
        return res.status(201).json({ msg: 'Product added to cart' });
    } catch (error) {
        console.log('Add product to cart fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// lấy thông tin giỏ hàng
router.get('/get', authenticate, async (req,res) => {
    const accountId = req.accountId;
    try {
        const connection = await pool.getConnection();

        const [rows] = await connection.execute(
            'SELECT productId, quantity FROM m_cart WHERE accountId = ?',
            [accountId]
        )

        connection.release();
        return res.status(200).json({ msg: 'success' , cart : rows });
    } catch (error) {
        console.log('Get cart fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Update thông tin giỏ hàng
router.put('/update',  authenticate,async (req,res) => {
    const accountId = req.accountId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    if (productId == undefined || quantity == undefined) return res.status(400).json({error:'Missing productId or quantity'})
    
    try {
        const connection = await pool.getConnection();

        // Kiểm tra sản phầm này có tồn tại trong giỏ hàng không
        const [rows] = await connection.execute(
            'SELECT * FROM m_cart WHERE accountId = ? AND productId = ?',
            [accountId,productId]
        )
        if (rows.length === 0) {
            connection.release();
            return res.status(404).json({error:'This product not in your cart, cant update'});
        }

        if (quantity == 0) {
            await connection.execute(
                'DELETE FROM m_cart WHERE accountId = ? AND productId = ?',
                [accountId,productId]
            )
        }
        
        await connection.execute(
            'UPDATE m_cart SET quantity = ? WHERE accountId = ? AND productId = ?',
            [quantity, accountId,productId]
        )

        connection.release();
        return res.status(200).json({ msg: 'success' });
    } catch (error) {
        console.log('Update cart fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
