const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = JSON.parse(process.env.dbConfig);

// Tạo một pool kết nối
const pool = mysql.createPool(dbConfig);

module.exports = pool;
