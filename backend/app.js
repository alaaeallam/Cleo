const express = require('express');
const app = express();
const errorMiddleWare = require('./middleware/errors');
app.use(express.json());

//Import all the routes
const products = require('./routes/product');
const auth = require('./routes/auth');
app.use('/api/v1', products);
app.use('/api/v1', auth);
//Middleware to handle errors
app.use(errorMiddleWare);
module.exports = app;
