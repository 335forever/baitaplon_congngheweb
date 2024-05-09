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
            return rows[0].username;
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
    const username = await verifyToken(token.replace('Bearer ', ''));
    if (!username) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
        return;
    }
    req.username = username;
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
            const username = req.username;

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

            updateQuery = updateQuery.slice(0, -1) + ' WHERE username = ?';
            updateValues.push(username);

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
    const username = req.username;
    try {
        const connection = await pool.getConnection();

        const [rows, fields] = await connection.execute(
            "SELECT username, name, email, phone, address, birthday, isShoper FROM m_account WHERE username = ?",
            [username]
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

// Khởi động server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

