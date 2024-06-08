const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const {authenticate} = require('../func');

router.post('/new', authenticate, async (req,res) => {
    const accountId = req.accountId;
    
    try {
        const connection = await pool.getConnection();
        const [accountInfo] = await connection.execute(
            'SELECT * FROM m_shoper WHERE accountId = ?',
            [accountId]
        );

        // Kiểm tra user có là shoper không
        if (accountInfo.length === 0) {
            connection.release();
            return res.status(403).json({error:'Insufficient permissions to create a new voucher'});
        }

        // Load data cần thiết xuống
        const discountPercent = req.body.discountPercent;
        const expired = new Date(req.body.expired);
        const quantity = req.body.quantity;
        const minPrice = req.body.minPrice || -1;
        const maxDiscount = req.body.maxDiscount || -1;

        if (!discountPercent || !Number.isInteger(discountPercent) || discountPercent <=0 || discountPercent >=100) {
            connection.release();
            return res.status(400).json({error:'Required valid discountPercent'});
        }

        if (!expired || expired <= new Date()) {
            connection.release();
            return res.status(400).json({error:'Required valid expried'});
        }

        if (!quantity || !Number.isInteger(quantity) || quantity <=0) {
            connection.release();
            return res.status(400).json({error:'Required valid quantity'});
        }

        await connection.execute(
            'INSERT INTO m_voucher (shoperID,discountPercent,expired,minprice,maxdiscount,quantity) VALUES (?,?,?,?,?,?)',
            [accountInfo[0].shoperID, discountPercent, expired, minPrice, maxDiscount, quantity]
        );
        
        return res.status(201).json({msg:'success'})
    } catch (error) {
        console.error('Make order fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

router.get('/find', async (req,res) => {
    const shopId = req.query.shopId;

    try {
        const connection = await pool.getConnection();

        if (!shopId) 
            var [vouchers] = await connection.execute('SELECT * FROM m_voucher ');
        else  
            var [vouchers] = await connection.execute(
            'SELECT * FROM m_voucher WHERE shoperId = ?',
            [shopId]
        );
        connection.release();
        return res.status(200).json({msg:'success', vouchers:vouchers});
    } catch (error) {
        console.error('Get vouchers fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;