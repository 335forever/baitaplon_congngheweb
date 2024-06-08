const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const {authenticate, getImagesByProductId, checkImagesFields} = require('../func');

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
        const voucherId = req.body.voucherId || -1;
        const paymentMethod = req.body.paymentMethod || 0;
        const orderDate = new Date();
        const status = 0;
        const isPaid = false;
        var total = productInfo[0].price * quantity;

        if (voucherId != -1) {
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
            'INSERT INTO m_order (accountID,productID,quantity,voucherID,isPaid,total,orderDate,status,paymentMethod) VALUES (?,?,?,?,?,?,?,?,?)',
            [accountId, productId, quantity, voucherId, isPaid, total, orderDate, status, paymentMethod]
        );

        return res.status(201).json({msg:'success'})
    } catch (error) {
        console.error('Make order fail:', error);
        return res.status(500).json({ total:total, error: error.message });
    }
});

module.exports = router;