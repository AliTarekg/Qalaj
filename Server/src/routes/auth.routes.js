const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/auth.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
// const { validateSchema } = require('../middlewares/validation.middleware');

// Public routes
router.post('/register' , register);
router.post('/login', login);

// Protected routes
router.get('/profile', verifyToken, getProfile);

// Simple logout (client-side token removal)
router.post('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

// Admin check route
router.get('/check-admin', verifyToken, isAdmin, (req, res) => {
    res.json({ isAdmin: true });
});

module.exports = router;