const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const usersController = require('../controllers/users.controller');

// List all users (for assignment dropdown)
router.get('/', verifyToken, usersController.listUsers);

module.exports = router;
