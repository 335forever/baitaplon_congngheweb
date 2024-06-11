const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const { generateToken, authenticate, hashPassword, genOTP, sendEmail} = require('../func');
require('dotenv').config();

// Đăng nhập
router.post('/login', async (req, res) => {
    // Lấy dữ liệu từ request
    const username = req.body.username;
    const password = req.body.password;
    
    // Kiểm tra thông tin đầu vào
    if (!username || !password) return res.status(400).json({ error: 'Missing username or password' }); 
    
    try {
        const connection = await pool.getConnection();
        
        // Kiểm tra liệu người dùng này đã tồn tại hay chưa
        const [rows] = await connection.execute(
            "SELECT * FROM m_account WHERE username = ?",
            [username]
        );
        if ( rows.length === 0) {
            connection.release();
            return res.status(404).json({ error: 'Invalid username' });
        }
            
        // Người dùng có tồn tại, tiếp tục đối chiếu mật khẩu
        const hashed_password_saved = rows[0].password;
        if (!bcrypt.compareSync(password, hashed_password_saved)) {
            connection.release();
            return res.status(401).json({ error: 'Invalid password' }); // Thông báo lỗi mật khẩu không hợp lệ
        }
        
        // Đăng nhập thành công, tiếp tục sinh token
        const token = await generateToken(username); 
        await connection.execute(
            "UPDATE m_account SET token = ? WHERE username = ?",
            [token, username]
        );
        
        connection.release();
        return res.status(200).json({ msg:'success', token }); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

// Đăng ký
router.post('/signup', async (req, res) => {
    // Lấy dữ liệu từ request
    const username = req.body.username;
    const password = req.body.password;
    
    // Kiểm tra xem username và password có đính kèm trong thân request không
    if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });

    // Có dữ liệu username và password, tiếp tục xử lí
    try {
        const connection = await pool.getConnection();
        
        // Kiểm tra username mới nhận có trùng lặp không
        const [rows] = await connection.execute(
            'SELECT * FROM `m_account` WHERE username = ?',
            [username]
        );
        if (rows.length > 0) {
            connection.release();
            return res.status(409).json({ error: 'Existed username' });
        } 
         
        // Người dùng chưa tồn tại, sẵn sàng tạo mới, lấy thêm dữ liệu (nếu có)
        const name    = req.body.name    || 'Your Name';
        const email   = req.body.email   || null;
        const dob     = req.body.dob     || null;
        const phone   = req.body.phone   || null;
        const address = req.body.address || null;
        const avatar  = req.body.avatar  || null;

        // Tạo user mới
        const hashedPassword = hashPassword(password); 
        await connection.execute(
            `INSERT INTO m_account (username, password, name, email, phone, address, birthday, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [username, hashedPassword, name, email, phone, address, dob, avatar]
        );
        
        connection.release();
        return res.status(201).json({ msg: 'success'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message});
    }
    
});

// Đổi mật khẩu
router.put('/changepassword', authenticate, async (req, res) => {
    const accountId = req.accountId;
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;
    if (oldPass == undefined || newPass == undefined) return res.status(400).json({error:'Require oldPass and newPass'});
    try {
        const connection = await pool.getConnection();
        const [userInfo] = await connection.execute(
            'SELECT password FROM m_account WHERE accountid = ?',
            [accountId]
        );
        const hashed_password_saved = userInfo[0].password;
        if (!bcrypt.compareSync(oldPass, hashed_password_saved)) {
            connection.release();
            return res.status(401).json({ error: 'Invalid old password' }); // Thông báo lỗi mật khẩu không hợp lệ
        }
        const hashedNewPass = hashPassword(newPass);
        await connection.execute(
            'UPDATE m_account SET password = ? WHERE accountid = ?',
            [hashedNewPass,accountId]
        );
        connection.release();
        return res.status(200).json({ msg: 'success'})
    } catch (error) {
        console.error('Change pass fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Cập nhật thông tin người dùng
router.put('/user/update', authenticate, async (req, res) => {
    const accountId = req.accountId;
    
    // Kiểm tra xem thử có dữ liệu đính kèm không
    const newData = req.body;
    if (Object.keys(newData).length === 0) return res.status(400).json({ error: 'None infor' });
    
    try {
        // Chuẩn bị câu truy vấn
        let updateQuery = 'UPDATE m_account SET';
        const updateValues = [];
        const unUsed = [];
        Object.keys(newData).forEach(key => {
        if (key === 'name' || key === 'email' || key === 'phone' || key === 'address' || key === 'birthday' || key === 'avatar'){
                updateQuery += ` ${key} = ?,`;
                updateValues.push(newData[key]);
            } 
            else unUsed.push(key);
        });
        updateQuery = updateQuery.slice(0, -1) + ' WHERE accountId = ?';
        updateValues.push(accountId);

        // Thực hiện truy vấn
        const connection = await pool.getConnection();
        await connection.execute(
            updateQuery,
            updateValues
        );
        
        connection.release();
        if (unUsed.length ===0) return res.status(200).json({ msg: 'success' });
        return res.status(200).json({ msg: 'success' , notUseToUpdate : unUsed})
    } catch (error) {
        console.error('Updated fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Up lên thành shop
router.put('/user/uptoshop', authenticate, async (req, res) => {
    const accountId = req.accountId;
    try {
        const connection = await pool.getConnection();
        const [user] = await connection.execute(
            'SELECT * FROM m_shoper WHERE accountID = ?',
            [accountId]
        );
        if (user.length != 0) {
            connection.release();
            return res.status(400).json({error:'You are already a shopper'})
        }

        const name = req.body.name;
        const phone = req.body.phone;
        const address = req.body.address;
        const email = req.body.email;
        const avatar = req.body.avatar;
        const taxid = req.body.taxid;

        if (!name || !phone || !address || !email || !taxid) {
            connection.release();
            return res.status(400).json({error:'Require full information about (name, phone, address, email, avatar, taxid)'});
        }
        
        await connection.execute(
            'INSERT INTO m_shoper (name,phone,address,email,avatar,taxid,accountID) VALUES (?,?,?,?,?,?,?)',
            [name,phone,address,email,avatar,taxid,accountId]
        );

        connection.release();
        return res.status(200).json({ msg: 'success'})
    } catch (error) {
        console.error('Up to shop fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Lấy thông tin người dùng
router.get('/user/getinfo', authenticate, async (req, res) => {
    const accountId = req.accountId;
    try {
        const connection = await pool.getConnection();

        const [rows] = await connection.execute(
            "SELECT accountid, name, email, phone, address, birthday, isShoper,avatar FROM m_account WHERE accountId = ?",
            [accountId]
        );

        const userInfo = rows[0];
        userInfo.isShoper = userInfo.isShoper[0] === 1;
        
        connection.release();
        return res.status(200).json({msg:'success',userInfo});
    } catch (error) {
        console.error('Get infor fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Lấy thông tin shop
router.get('/shop/getinfo', authenticate, async (req, res) => {
    const accountId = req.accountId;
    try {
        const connection = await pool.getConnection();
        const [shopInfo] = await connection.execute(
            'SELECT * FROM m_shoper WHERE accountID = ?',
            [accountId]
        );
        if (shopInfo.length == 0) {
            connection.release();
            return res.status(403).json({error:'You are not a shop'});
        }
        
        connection.release();
        return res.status(200).json({msg:'success',shopInfo});
    } catch (error) {
        console.error('Get infor fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Cập nhật thông tin shop
router.put('/shop/update', authenticate, async (req, res) => {
    const accountId = req.accountId;
    
    // Kiểm tra xem thử có dữ liệu đính kèm không
    const newData = req.body;
    if (Object.keys(newData).length === 0) return res.status(400).json({ error: 'None infor' });
    
    try {
        const connection = await pool.getConnection();
        const [shopInfo] = await connection.execute(
            'SELECT * FROM m_shoper WHERE accountID = ?',
            [accountId]
        );
        if (shopInfo.length == 0) {
            connection.release();
            return res.status(403).json({error:'You are not a shop'});
        }

        // Chuẩn bị câu truy vấn
        let updateQuery = 'UPDATE m_shoper SET';
        const updateValues = [];
        const unUsed = [];
        Object.keys(newData).forEach(key => {
        if (key === 'name' || key === 'phone' || key === 'address' || key === 'email' || key === 'avatar' || key === 'taxid'){
                updateQuery += ` ${key} = ?,`;
                updateValues.push(newData[key]);
            } 
            else unUsed.push(key);
        });
        updateQuery = updateQuery.slice(0, -1) + ' WHERE accountId = ?';
        updateValues.push(accountId);

        // Thực hiện truy vấn
        await connection.execute(
            updateQuery,
            updateValues
        );
        
        connection.release();
        if (unUsed.length ===0) return res.status(200).json({ msg: 'success' });
        return res.status(200).json({ msg: 'success' , notUseToUpdate : unUsed})
    } catch (error) {
        console.error('Updated fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Tìm người dùng
router.get('/finduser', async (req, res) => {
    const accountId = req.query.accountId;
    if (!accountId) return res.status(400).json({error:'Missing accountId'});
    try {
        const connection = await pool.getConnection();

        const [user] = await connection.execute(
            "SELECT name, email, phone, address, avatar FROM m_account WHERE accountId = ?",
            [accountId]
        );
        connection.release();
        return res.status(200).json({msg:'success',user});
    } catch (error) {
        console.error('Get infor fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Tìm shop
router.get('/findshop', async (req, res) => {
    const shopId = req.query.shopId;
    if (!shopId) return res.status(400).json({error:'Missing shopId'});
    try {
        const connection = await pool.getConnection();

        const [shop] = await connection.execute(
            "SELECT name,phone,address,email,avatar,taxid FROM m_shoper WHERE shoperID = ?",
            [shopId]
        );

        connection.release();
        return res.status(200).json({msg:'success',shop});
    } catch (error) {
        console.error('Get infor fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Quên mật khẩu (step 1)
router.post('/forgotpassword/otp',async (req, res) => {
    const username = req.body.username;
    if (!username) return res.status(400).json({error:'Missing username'});
    try {
        const connection = await pool.getConnection();
     
        const [user] = await connection.execute(
            'SELECT accountid,email FROM m_account WHERE username = ?',
            [username]
        );

        if (user.length === 0) {
            connection.release();
            return res.status(404).json({error:'Invalid username'});
        }

        if (!user[0].email) {
            connection.release();
            return res.status(404).json({error:'No information about secure email'});
        }
        
        const otpContainer = {
            otp: genOTP(),
            accountId: user[0].accountid,
            expiryTime: new Date(Date.now() + 15 * 60000)
        }
        const index = global.otpList.findIndex(item => item.accountId === user[0].accountid);
        if (index !== -1) 
            global.otpList[index] = otpContainer;
        else 
            global.otpList.push(otpContainer);
        
        await sendEmail(user[0].email,otpContainer.otp);
        connection.release();
        return res.status(200).json({msg:'success'});
    } catch (error) {
        console.error('Send OTP fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Quên mật khẩu (step 2)
router.post('/forgotpassword/confirm',async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const otp = req.body.otp;
    if (!username) return res.status(400).json({error:'Missing username'});
    if (!password) return res.status(400).json({error:'Missing password'});
    if (!otp) return res.status(400).json({error:'Missing otp'});
    try {
        const connection = await pool.getConnection();
        const [user] = await connection.execute(
            'SELECT accountid FROM m_account WHERE username = ?',
            [username]
        );
        if (user.length === 0) {
            connection.release();
            return res.status(404).json({error:'Invalid username'});
        }
        const index = global.otpList.findIndex(item => item.accountId === user[0].accountid);
        if (index == -1) {
            connection.release();
            return res.status(400).json({error:'Get OTP first'});
        }
        if (otp != global.otpList[index].otp) {
            connection.release();
            return res.status(400).json({error:'OTP incorrect'});
        }
        if (Date.now() > global.otpList[index].expiryTime) {
            connection.release();
            return res.status(400).json({error:'OTP expiried'});
        }
        await connection.execute(
            'UPDATE m_account SET password = ? WHERE accountid = ?',
            [hashPassword(password),user[0].accountid]
        );
        global.otpList.splice(index, 1);
        connection.release();
        return res.status(200).json({msg:'success'});
    } catch (error) {
        console.error('Set new pass fail:', error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
