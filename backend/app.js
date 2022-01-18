const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

const errorMiddleWare = require('./middleware/errors');

//Import all the routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
//Middleware to handle errors
app.use(errorMiddleWare);
module.exports = app;
