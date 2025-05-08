const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route example
router.get('/profile', verifyToken, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;