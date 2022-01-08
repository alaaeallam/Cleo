const express = require('express');
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrder,
  allOrder,
} = require('../controllers/orderControllers');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrder);
router
  .route('/admin/orders/')
  .get(isAuthenticatedUser, authorizeRoles('admin'), allOrder);

module.exports = router;
