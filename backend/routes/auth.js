const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgetPassword,
  logout,
} = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forget').post(forgetPassword);
router.route('/logout').get(logout);

module.exports = router;
