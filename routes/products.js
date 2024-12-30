// routes/product.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');  // Import product controller

// Route for showing all products
router.get('/', productController.showAllProducts);

// Route for showing add product form
router.get('/add', productController.showAddProductForm);

// Route for adding a new product
router.post('/add', productController.addProduct);

// Route for showing edit product form
router.get('/edit/:id', productController.showEditProductForm);

// Route for updating product
router.post('/edit/:id', productController.updateProduct);

// Route for deleting a product
router.get('/delete/:id', productController.deleteProduct);

module.exports = router;
