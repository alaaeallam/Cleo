const express = require('express');
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReview,
} = require('../controllers/productControllers');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/products').get(isAuthenticatedUser, getProducts);
router.route('/product/:id').get(getSingleProduct);
router
  .route('/admin/product/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router
  .route('/admin/product/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(isAuthenticatedUser, getProductReview);

module.exports = router;
