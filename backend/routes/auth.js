const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
  logout,
} = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forget').post(forgetPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logout);

module.exports = router;
