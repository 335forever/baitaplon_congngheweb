const jwt = require('jsonwebtoken');
const pool = require('./db');  // Import pool kết nối từ file db.js
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

// Nếu sử dụng tệp .env để quản lý biến môi trường
require('dotenv').config();

// Hàm tạo token
const generateToken = async (username) => {
    // Kiểm tra xem các biến môi trường đã được thiết lập chưa
    const secretKey = process.env.genTokenKey;
    const tokenTimeToLive = process.env.tokenTimeToLive;

    if (!secretKey || !tokenTimeToLive) {
        throw new Error('Environment variables genTokenKey and tokenTimeToLive must be set');
    }

    // Tạo payload với thông tin username
    const payload = { username };

    // Tùy chọn cho token, bao gồm thời gian sống
    const options = { expiresIn: tokenTimeToLive };  // Token sẽ hết hạn sau thời gian được chỉ định

    // Tạo và ký token
    const token = jwt.sign(payload, secretKey, options);

    return token;
};

// Hàm kiểm tra và xác minh token
const verifyToken = async (token) => {
    try {
        const secretKey = process.env.genTokenKey; // Lấy khóa bí mật từ biến môi trường

        // Xác minh và giải mã token
        const decoded = jwt.verify(token, secretKey);

        // Lấy username từ token đã giải mã
        const username = decoded.username;

        // Lấy một kết nối từ pool
        const connection = await pool.getConnection();
        
        const [rows] = await connection.execute(
            "SELECT * FROM m_account WHERE username = ? AND token = ?",
            [username, token]
        );
        
        connection.release();

        if (rows && rows.length > 0) {
            return rows[0].accountid;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
};

// Hàm xác thực token
const authenticate = async (req, res, next) => {
    
    // Kiểm tra xem token có được đính kèm không
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Unauthorized (Missing token)' });
    
    // Kiểm tra token có tương ứng với user nào không
    const accountId = await verifyToken(token.replace('Bearer ', ''));
    if (!accountId) return res.status(401).json({ error: 'Unauthorized (Wrong token)' });
        
    req.accountId = accountId;
    next();
};

const getImagesByProductId = async (productId) => {
    const connection = await pool.getConnection();
    const [images] = await connection.execute(
        "SELECT * FROM m_productimage WHERE productId = ?",
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

function checkImagesFields(images, numberOfFields) {
    for (let i = 1; i <= numberOfFields; i++) {
        const fieldName = `image${i}`;
        if (images.hasOwnProperty(fieldName)) {
            return true;  // Chỉ cần tìm thấy một trường hợp lệ
        }
    }
    return false;  // Không tìm thấy trường hợp lệ nào
};

function hashPassword(password) {
    return bcrypt.hashSync(password, parseInt(process.env.password_salt_rounds, 10)); 
}

const sendEmail = async (toEmail, htmlContent) => {
    // Tạo transporter với thông tin tài khoản email của bạn
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.APP_PASSWORD
        }
      });

    // Tạo email options
    let mailOptions = {
        from: process.env.EMAIL,
        to: toEmail,
        subject: 'Kính chào quý khách',
        html: htmlContent
    };

    // Gửi email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log('Error: ' + error.message);
    }
};

const genOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = { generateToken, authenticate, getImagesByProductId, checkImagesFields, sendEmail, hashPassword, genOTP};
