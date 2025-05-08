const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} = require('../controllers/order.controller');

// Apply authentication middleware to all order routes
router.use(verifyToken);

// Order routes
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrderStatus);
router.delete('/:id', isAdmin, deleteOrder); // Only admin can delete orders

module.exports = router;