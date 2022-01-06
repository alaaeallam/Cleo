const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
  getUserProfile,
  logout,
} = require('../controllers/authController');

const { isAuthenticatedUser } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forget').post(forgetPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile);

module.exports = router;
