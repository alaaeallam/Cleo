const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  logout,
} = require('../controllers/authController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forget').post(forgetPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);
router
  .route('/admin/users/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails);
module.exports = router;
