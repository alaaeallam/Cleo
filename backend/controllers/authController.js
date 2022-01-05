const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
//Register a user => /api/v1/register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'avatars/kccvibpsuiusmwfepb3m',
      url: 'https://res.cloudinary.com/shopit/image/upload/v1606305757/avatars/kccvibpsuiusmwfepb3m.png',
    },
  });

  sendToken(user, 200, res);
});

//Login user => /api/v1/login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email & password', 400));
  }

  // find user in database
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid username or password', 401));
  }
  // checks if password is correct or not
  const isPasswordMAtched = await user.comparePassword(password);
  if (!isPasswordMAtched) {
    return next(new ErrorHandler('Invalid username or password', 401));
  }
  sendToken(user, 200, res);
});

//Forget Password => api/v1/password/forget
exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler('User not found with this email', 404));
  }
  // Get rest token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //create password url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nif you have not requested this email then ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Cleo Password recovery',
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});
//Logout user /api/v1/logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out',
  });
});
