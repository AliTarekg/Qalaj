const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const ordersController = require('../controllers/orders.controller');

// CRUD
router.get('/', verifyToken, ordersController.listOrders);
router.get('/:id', verifyToken, ordersController.getOrder);
router.post('/', verifyToken, ordersController.createOrder);
router.put('/:id', verifyToken, ordersController.updateOrder);
router.delete('/:id', verifyToken, ordersController.deleteOrder);

// Order items
router.get('/:id/items', verifyToken, ordersController.getOrderItems);
router.post('/:id/items', verifyToken, ordersController.createOrderItem);

module.exports = router;
