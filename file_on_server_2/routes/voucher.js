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

router.delete('/remove',authenticate, async (req,res) => {
    const accountId = req.accountId;
    const voucherId = req.body.voucherId;
    if (!voucherId) return res.status(400).json({msg: 'Missing voucherId'});
    try {
        const connection = await pool.getConnection();

        // Kiểm tra user có quyền của shop không
        const [rows] = await connection.execute(
            "SELECT * FROM m_shoper WHERE accountId = ?",
            [accountId]
        );
        if (rows.length === 0) {
            connection.release();
            return res.status(403).json({ error: 'Unauthorized to remove a voucher' });
        }
        const shoperId = rows[0].shoperID;

        // Kiểm tra voucher này có thuộc shop này không
        const [findVoucherOfThisShop] = await connection.execute(
            `SELECT * FROM m_voucher WHERE voucherID = ? AND shoperID = ? `,
            [voucherId,shoperId]
        );
        if (findVoucherOfThisShop.length === 0) {
            connection.release();
            return res.status(403).json({ error: 'You do not have permission to remove this voucher' });
        }

        // Thực hiện xóa voucher
        await connection.execute(
            'DELETE FROM m_voucher WHERE voucherID = ?',
            [voucherId]
        );
 
        connection.release;
        return res.status(200).json({ msg: 'success' });
    } catch (error) {
        console.error('Remove voucher fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Cập nhật thông tin voucher
router.put('/update', authenticate, async (req, res) => {
    const accountId = req.accountId;
    const voucherId = req.body.voucherId;
    if (!voucherId) return res.status(400).json({msg: 'Missing voucherId'});
    try {
        const connection = await pool.getConnection();

        // Kiểm tra user có quyền của shop không
        const [rows] = await connection.execute(
            "SELECT * FROM m_shoper WHERE accountId = ?",
            [accountId]
        );
        if (rows.length === 0) {
            connection.release();
            return res.status(403).json({ error: 'Unauthorized to remove a voucher' });
        }
        const shoperId = rows[0].shoperID;

        // Kiểm tra voucher này có thuộc shop này không
        const [findVoucherOfThisShop] = await connection.execute(
            `SELECT * FROM m_voucher WHERE voucherID = ? AND shoperID = ? `,
            [voucherId,shoperId]
        );
        if (findVoucherOfThisShop.length === 0) {
            connection.release();
            return res.status(403).json({ error: 'You do not have permission to remove this voucher' });
        }

        // Đọc data từ request
        const discountPercent   = req.body.discountPercent;
        const expired        = req.body.expired ;
        const minprice    = req.body.minprice;
        const maxdiscount       = req.body.maxdiscount;
        const quantity  = req.body.quantity;

        // Kiểm tra có data để cập nhật không
        if (!discountPercent && !expired && !minprice && !maxdiscount && !quantity) {
            connection.release();
            return res.status(400).json({error: 'No data to update'})
        }

        // Cập nhật voucher nếu có dữ liệu
        let updateQuery = "UPDATE m_voucher SET "; // Chuẩn bị câu truy vấn
        let updateValues = [];
        if (discountPercent) {
            updateQuery += "discountPercent = ?, ";
            updateValues.push(discountPercent);
        }
        if (expired) {
            updateQuery += "expired = ?, ";
            updateValues.push(expired);
        }
        if (minprice) {
            updateQuery += "minprice = ?, ";
            updateValues.push(minprice);
        }
        if (maxdiscount) {
            updateQuery += "maxdiscount = ?, ";
            updateValues.push(maxdiscount);
        }
        if (quantity) {
            updateQuery += "quantity = ?, ";
            updateValues.push(quantity);
        }
        updateQuery = updateQuery.slice(0, -2);
        updateQuery += " WHERE voucherId = ?";
        updateValues.push(voucherId);

        // Thực hiện cập nhật voucher 
        await connection.execute(updateQuery, updateValues);
        
        connection.release();
        return res.status(200).json({ msg: 'success' });
    } catch (error) {
        console.error('Update voucher fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;