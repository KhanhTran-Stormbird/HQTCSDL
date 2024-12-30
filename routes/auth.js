const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Đảm bảo rằng authController đã được export đúng cách

// Đảm bảo rằng bạn đang gọi đúng các hàm trong controller
router.get('/login', authController.showLoginForm); // Sử dụng đúng hàm controller
router.post('/login', authController.loginUser); // Sử dụng đúng hàm controller

// Register route
router.get('/register', authController.showRegisterForm); // Hiển thị form đăng ký
router.post('/register', authController.registerUser); // Xử lý đăng ký người dùng

module.exports = router;
