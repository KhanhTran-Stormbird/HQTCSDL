const productModel = require('../models/productModel');

// Hiển thị tất cả sản phẩm
async function showAllProducts(req, res) {
    try {
        const products = await productModel.getAllProducts();
        res.render('index', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
    }
}

// Hiển thị form thêm sản phẩm mới
function showAddProductForm(req, res) {
    res.render('add');
}

// Xử lý thêm sản phẩm mới
async function addProduct(req, res) {
    const { name, quantity, price } = req.body;
    if (!name || !quantity || !price) {
        return res.status(400).send('All fields are required.');
    }

    try {
        await productModel.addProduct(name, quantity, price);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding product');
    }
}

// Hiển thị form sửa sản phẩm
async function showEditProductForm(req, res) {
    const { id } = req.params;
    try {
        const product = await productModel.getProductById(id);
        if (product) {
            res.render('edit', { product });
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching product');
    }
}

// Xử lý cập nhật thông tin sản phẩm
async function updateProduct(req, res) {
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    try {
        await productModel.updateProduct(id, name, quantity, price);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating product');
    }
}

// Xử lý xóa sản phẩm
async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
        await productModel.deleteProduct(id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting product');
    }
}

module.exports = {
    showAllProducts,
    showAddProductForm,
    addProduct,
    showEditProductForm,
    updateProduct,
    deleteProduct
};
