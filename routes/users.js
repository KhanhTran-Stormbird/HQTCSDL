const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Định tuyến cho login
router.post('/users', userController.showAllUsers);

module.exports = router;
