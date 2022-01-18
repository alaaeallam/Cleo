const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const errorMiddleWare = require('./middleware/errors');

//Setting up cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_sceret: process.env.CLOUDINARY_API_SECRET,
});
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
