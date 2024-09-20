const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const validate = require('../middleware/validate');

const productValidationRules = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').notEmpty().withMessage('Product description is required'),
];

router.post(
  '/',
  (req, res, next) => {
    if (Array.isArray(req.body)) {
      // If it's an array, apply validation to each item
      req.body.forEach((item, index) => {
        productValidationRules.forEach(rule => rule.run(req));
      });
    } else {
      // If it's a single object, apply validation normally
      productValidationRules.forEach(rule => rule.run(req));
    }
    next();
  },
  validate,
  createProduct
);

router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;