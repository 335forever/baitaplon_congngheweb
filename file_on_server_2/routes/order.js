const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const {authenticate} = require('../func');

router.post('/new', authenticate, async (req,res) => {
    const accountId = req.accountId;
    
    // Kiểm tra tham số khởi đầu
    const productId = req.body.productId;
    if (!productId) return res.status(400).json({error:'Missing productId'});
    const quantity = req.body.quantity;
    if (!quantity || !Number.isInteger(quantity) || quantity <= 0) return res.status(400).json({error:'Missing or quantity value'})

    try {
        const connection = await pool.getConnection();
        const [productInfo] = await connection.execute(
            'SELECT * FROM m_product WHERE productId = ?',
            [productId]
        );

        // Kiểm tra sự tồn tại của sản phẩm trên sàn
        if (productInfo.length === 0) {
            connection.release();
            return res.status(404).json({error:'This product not exist'});
        }

        // Kiểm tra số lượng có đáp ứng đủ đơn hàng
        if (productInfo[0].quantity < quantity ) {
            connection.release();
            return res.status(400).json({error:'Insufficient stock for the requested quantity'});
        }

        // Load data cần thiết 
        const voucherId = req.body.voucherId || null;
        const paymentMethod = req.body.paymentMethod || 0;
        const orderDate = new Date();
        const status = 0;
        const isPaid = false;
        const msgToShop = req.body.msgToShop || null;
        var total = productInfo[0].price * quantity;

        if (voucherId) {
            const [voucherInfo] = await connection.execute(
                'SELECT * FROM m_voucher WHERE voucherID = ?',
                [voucherId]
            );
            if (voucherInfo.length === 0) {
                connection.release();
                return res.status(404).json({error:'Invalid voucherId (wrong)'});
            }
            if (voucherInfo[0].shoperID != productInfo[0].shoperID) {
                connection.release();
                return res.status(400).json({error:'Invalid voucherId (belong to other shop)'});
            }
            if (voucherInfo[0].quantity <=0) {
                connection.release();
                return res.status(400).json({error:'Invalid voucherId (no vouchers available)'});
            }
            if (new Date() > voucherInfo[0].expired  ) {
                connection.release();
                return res.status(400).json({error:'Invalid voucherId (expired)'});
            }
            if (voucherInfo[0].minprice != -1 && productInfo[0].price < voucherInfo[0].minprice  ) {
                connection.release();
                return res.status(400).json({error:'Invalid voucherId (product price lower than voucher minprice)'});
            }

            if (voucherInfo[0].maxdiscount === -1 ) 
                total = total - Math.round(total*voucherInfo[0].discountPercent/100);
            else 
                total = total - Math.min(Math.round(total*voucherInfo[0].discountPercent/100), voucherInfo[0].maxdiscount);
        }

        await connection.execute(
            'INSERT INTO m_order (accountID,productID,quantity,voucherID,isPaid,total,orderDate,status,paymentMethod,shoperID,msgToShop) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [accountId, productId, quantity, voucherId, isPaid, total, orderDate, status, paymentMethod,productInfo[0].shoperID,msgToShop]
        );

        return res.status(201).json({msg:'success'})
    } catch (error) {
        console.error('Make order fail:', error);
        return res.status(500).json({ total:total, error: error.message });
    }
});

router.get('/get', authenticate, async (req,res) => {
    const accountId = req.accountId;
    try {
        const connection = await pool.getConnection();
        const [order] = await connection.execute(
            'SELECT * FROM m_order WHERE accountId = ?',
            [accountId]
        );

        connection.release();
        return res.status(201).json({msg:'success',order})
    } catch (error) {
        console.error('Get order fail:', error);
        return res.status(500).json({error: error.message });
    }
});

router.put('/change',authenticate, async (req,res) => {
    const accountId = req.accountId;
    const orderId = req.body.orderId;
    if (!orderId) return res.status(400).json({error:'Missing orderId'})
    const status = req.body.status;
    const paymentMethod = req.body.paymentMethod;
    const msgToShop = req.body.msgToShop;
    if (status == undefined && paymentMethod == undefined && msgToShop == undefined) return res.status(400).json({error:'No data'});
    try {
        const connection = await pool.getConnection();
        
        const [order] = await connection.execute(
            'SELECT * FROM m_order WHERE orderID = ? AND accountID = ?',
            [orderId,accountId]
        );
        if (order.length == 0) {
            connection.release();
            return res.status(403).json({error:'You do not have permission to change this order'});
        }
        
        if (status == 2) {
            await connection.execute(
                'UPDATE m_order SET status = ? WHERE orderID = ?',
                [status,orderId]
            );
        }

        if (paymentMethod != undefined) {
            await connection.execute(
                'UPDATE m_order SET paymentMethod = ? WHERE orderID = ?',
                [paymentMethod,orderId]
            );
        }

        if (msgToShop != undefined) {
            await connection.execute(
                'UPDATE m_order SET msgToShop = ? WHERE orderID = ?',
                [msgToShop,orderId]
            );
        }

        connection.release();
        return res.status(200).json({msg:'success'})
    } catch (error) {
        console.error('Approve order fail:', error);
        return res.status(500).json({error: error.message });
    }
});

router.get('/manager', authenticate, async (req,res) => {
    const accountId = req.accountId;
    try {
        const connection = await pool.getConnection();
        const [shoperInfo] = await connection.execute(
            'SELECT * FROM m_shoper WHERE accountId = ?',
            [accountId]
        );
        if (shoperInfo.length == 0) {
            connection.release();
            return res.status(403).json({error:'User is not authorized to manage order'})
        }
        const [orderInfo] = await connection.execute(
            'SELECT * FROM m_order WHERE shoperID = ?',
            [shoperInfo[0].shoperID]
        );

        connection.release();
        return res.status(201).json({msg:'success',orderInfo})
    } catch (error) {
        console.error('Manager order fail:', error);
        return res.status(500).json({error: error.message });
    }
});

router.put('/approve',authenticate, async (req,res) => {
    const accountId = req.accountId;
    const orderId = req.body.orderId;
    if (!orderId) return res.status(400).json({error:'Missing orderId'})
    const isPaid = req.body.isPaid;
    const status = req.body.status;
    const msgToUser = req.body.msgToUser;
    if (isPaid == undefined && status == undefined && msgToUser == undefined) return res.status(400).json({error:'No data'});
    try {
        const connection = await pool.getConnection();
        
        const [shoper] = await connection.execute(
            'SELECT * FROM m_shoper WHERE accountID = ?',
            [accountId]
        );
        if (shoper.length == 0) {
            connection.release();
            return res.status(403).json({error:'Unauthorized to approve an order'});
        }

        const [order] = await connection.execute(
            'SELECT * FROM m_order WHERE orderID = ? AND shoperID = ?',
            [orderId,shoper[0].shoperID]
        );
        if (order.length == 0) {
            connection.release();
            return res.status(403).json({error:'You do not have permission to approve this order'});
        }
        
        // Chuẩn bị câu truy vấn
        let updateQuery = "UPDATE m_order SET ";
        let updateValues = [];
        if (isPaid != undefined) {
            updateQuery += "isPaid = ?, ";
            updateValues.push(isPaid);
        }
        if (status != undefined && status == 0 || status == 1 || status == 2) {
            updateQuery += "status = ?, ";
            updateValues.push(status);
        }
        if (msgToUser != undefined) {
            updateQuery += "msgToUser = ?, ";
            updateValues.push(msgToUser);
        }
        updateQuery = updateQuery.slice(0, -2);
        updateQuery += " WHERE orderID = ?";
        updateValues.push(orderId);

        await connection.execute(updateQuery, updateValues);
        
        connection.release();
        return res.status(200).json({msg:'success'})
    } catch (error) {
        console.error('Approve order fail:', error);
        return res.status(500).json({error: error.message });
    }
});

module.exports = router;