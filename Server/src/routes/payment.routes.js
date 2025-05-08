const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment
} = require('../controllers/payment.controller');

// Apply authentication middleware to all payment routes
router.use(verifyToken);

// Payment routes
router.post('/', createPayment);
router.get('/', getPayments);
router.get('/:id', getPaymentById);
router.put('/:id', isAdmin, updatePayment);
router.delete('/:id', isAdmin, deletePayment);

module.exports = router;