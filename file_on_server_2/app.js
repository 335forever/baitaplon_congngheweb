const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const voucherRouter = require('./routes/voucher');
const {sendEmail} = require('./func');

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

app.use('/auth', authRouter);

app.use('/product', productRouter);

app.use('/cart', cartRouter);

app.use('/order', orderRouter);

app.use('/voucher', voucherRouter);

// const htmlContent = "<div style='color:red'>Hello World!</div>"
// sendEmail('ducquank52t1@gmail.com',htmlContent);



// Khởi động server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
