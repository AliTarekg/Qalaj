const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const orderItemsController = require('../controllers/orderItems.controller');

router.get('/:orderId', verifyToken, orderItemsController.listOrderItems);
router.post('/', verifyToken, orderItemsController.createOrderItem);

module.exports = router;
