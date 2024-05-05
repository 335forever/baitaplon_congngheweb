const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const bcrypt = require('bcrypt');


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

const dbConfig = {
    host: 'localhost',
    user: 'quan',
    password: '335forever',
    database: 'database_for_server2'
};

// Kiểm tra kết nối cơ sở dữ liệu
function connectToDatabase() {
    const conn = mysql.createConnection(dbConfig);

    conn.connect((err) => {
        if (err) {
            console.error('Lỗi kết nối cơ sở dữ liệu:', err);
            return;
        }
        console.log('Kết nối thành công đến cơ sở dữ liệu');
    });

    return conn;
}

// Tạo token khi đăng nhập thành công và lưu vào cơ sở dữ liệu
function generateToken(username) {
    const token = require('crypto').randomBytes(32).toString('hex');

    const conn = connectToDatabase();

    const tokenCreatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = "UPDATE m_account SET token = ?, token_created_at = ? WHERE username = ?";
    conn.query(sql, [token, tokenCreatedAt, username], (err, result) => {
        if (err) {
            console.error('Lỗi khi cập nhật token vào cơ sở dữ liệu:', err);
            return;
        }
        console.log('Token được cập nhật thành công');
    });

    conn.end();
    return token;
}

// Kiểm tra và xác minh token
function verifyToken(token) {
    const conn = connectToDatabase();

    const sql = "SELECT * FROM m_account WHERE token = ? AND token_created_at >= DATE_SUB(NOW(), INTERVAL 1 DAY)";
    conn.query(sql, [token], (err, result) => {
        if (err) {
            console.error('Lỗi khi thực hiện truy vấn:', err);
            return false;
        }
        if (result && result.length > 0) {
            return result[0].username;
        } else {
            return false;
        }
    });

    conn.end();
}

// Xác thực token
function authenticate(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
        return;
    }
    const username = verifyToken(token.replace('Bearer ', ''));
    if (!username) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
        return;
    }
    req.username = username;
    next();
}

// Đăng nhập
app.post('/api/signin', (req, res) => {
    const { username, password } = req.body;

    const conn = connectToDatabase();

    const sql = "SELECT * FROM m_account WHERE username = ?";
    conn.query(sql, [username], (err, result) => {
        if (err) {
            res.status(500).json({ status: 'error', message: 'Database unreachable' });
            return;
        }
        if (result && result.length > 0) {
            const hashed_password = result[0].password;
            if (password === hashed_password) {
                const token = generateToken(username);
                res.json({ token });
            } else {
                res.status(401).json({ status: 'error', message: 'Invalid password' });
            }
        } else {
            res.status(404).json({ status: 'error', message: 'Invalid username' });
        }
    });

    conn.end();
});

// Đăng ký
app.post('/api/signup', (req, res) => {
    // Lấy dữ liệu từ yêu cầu
    const userData = req.body;

    // Kiểm tra xem username và password có tồn tại không
    if (userData.username && userData.password) {
        const username = userData.username;
        const password = userData.password;

        // Kết nối đến cơ sở dữ liệu
        const conn = connectToDatabase();
        if (conn.connect_error) {
            res.status(500).json({ status: 'error', message: 'Database unreachable' });
            return;
        }

        // Kiểm tra xem người dùng đã tồn tại chưa
        conn.query('SELECT * FROM m_account WHERE username = ?', [username], (error, results) => {
            if (error) {
                res.status(500).json({ status: 'error', message: 'Failed to create user' , error1 : "error"});
                return;
            }

            if (results.length > 0) {
                // Người dùng đã tồn tại
                res.status(409).json({ status: 'error', message: 'Existed username' });
            } else {
                // Người dùng chưa tồn tại, thêm vào cơ sở dữ liệu
                const name = userData.name || 'Your Name';
                const email = userData.email || null;
                const dob = userData.dob || null;
                const isShoper = userData.isShoper === 'true';
                const phone = userData.phone || null;
                const address = userData.address || null;

                // Tạo câu lệnh SQL và thực thi
                const sql = `INSERT INTO m_account (username, password, name, email, phone, address, birthday, isShoper) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                const hashedPassword = bcrypt.hashSync(password, 10); // Sử dụng bcrypt để băm mật khẩu
                conn.query(sql, [username, hashedPassword, name, email, phone, address, dob, isShoper], (error, results) => {
                    if (error) {
                        res.status(500).json({ status: 'error', message: 'Failed to create user' });
                        return;
                    }

                    if (isShoper) {
                        // Thêm dữ liệu vào bảng M_shoper
                        const accountId = results.insertId; // Lấy ID của tài khoản vừa được tạo
                        const taxid = userData.taxid || null;
                        conn.query('INSERT INTO m_shoper (taxid, accountID) VALUES (?, ?)', [taxid, accountId], (error, results) => {
                            if (error) {
                                res.status(500).json({ status: 'error', message: 'Failed to create user' });
                                return;
                            }
                        });
                    }

                    // Trả về thông báo thành công
                    res.status(201).json({ status: 'success', message: 'Sign up successfully' });
                });
            }
        });

        // Đóng kết nối
        conn.end();
    } else {
        res.status(400).json({ status: 'error', message: 'Missing username or password' });
    }
});


// Cập nhật thông tin người dùng
app.put('/api/update', authenticate, (req, res) => {
    // TODO: Thực hiện việc cập nhật thông tin người dùng
});

// Khởi động server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});