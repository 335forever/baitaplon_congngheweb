const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const {authenticate} = require('../func');

router.post('/getincome', authenticate, async (req,res)=>{
    const accountId = req.accountId;
    const from = req.body.from;
    const to = req.body.to;
    if (from == undefined || to == undefined) return res.status(400).json({error:'Missing date range (from,to)'});

    try {
        const connection = await pool.getConnection();
        const [shopInfo] = await connection.execute(
            'SELECT * FROM m_shoper WHERE accountID = ?',
            [accountId]
        );
        if (shopInfo.length == 0) {
            connection.release();
            return res.status(403).json({ error: 'Unauthorized to get income' });
        }
        const [orders] = await connection.execute(
            'SELECT total FROM m_order WHERE shoperID = ? AND status = ? AND orderDate BETWEEN ? AND ?',
            [shopInfo[0].shoperID,1,from,to]
        );
        const income = orders.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
        
        return res.status(200).json({msg:'success',income});
    } catch (error) {
        console.error('Get income fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

router.post('/getcustomernumber', authenticate, async (req,res)=>{
    const accountId = req.accountId;
    const from = req.body.from;
    const to = req.body.to;
    if (from == undefined || to == undefined) return res.status(400).json({error:'Missing date range (from,to)'});

    try {
        const connection = await pool.getConnection();
        const [shopInfo] = await connection.execute(
            'SELECT * FROM m_shoper WHERE accountID = ?',
            [accountId]
        );
        if (shopInfo.length == 0) {
            connection.release();
            return res.status(403).json({ error: 'Unauthorized to get customer number' });
        }
        const [customers] = await connection.execute(
            'SELECT COUNT(DISTINCT accountID) AS customerCount FROM m_order WHERE shoperID = ? AND status = ? AND orderDate BETWEEN ? AND ?',
            [shopInfo[0].shoperID, 1, from, to]
        );
        const customerCount = customers[0].customerCount;
        
        return res.status(200).json({msg:'success',customerCount});
    } catch (error) {
        console.error('Get income fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

router.post('/getordernumber', authenticate, async (req,res)=>{
    const accountId = req.accountId;
    const from = req.body.from;
    const to = req.body.to;
    if (from == undefined || to == undefined) return res.status(400).json({error:'Missing date range (from,to)'});

    try {
        const connection = await pool.getConnection();
        const [shopInfo] = await connection.execute(
            'SELECT * FROM m_shoper WHERE accountID = ?',
            [accountId]
        );
        if (shopInfo.length == 0) {
            connection.release();
            return res.status(403).json({ error: 'Unauthorized to get customer number' });
        }
        const [orders] = await connection.execute(
            'SELECT total FROM m_order WHERE shoperID = ? AND status = ? AND orderDate BETWEEN ? AND ?',
            [shopInfo[0].shoperID,1,from,to]
        );

        return res.status(200).json({msg:'success',orderCount:orders.length});
    } catch (error) {
        console.error('Get income fail:', error);
        return res.status(500).json({ error: error.message });
    }
});


module.exports = router;