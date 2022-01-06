const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//Create a new order => /api/v1/order/new

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    orderItems,
    shippingInfo,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    order,
  });
});
