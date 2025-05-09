const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const customersController = require('../controllers/customers.controller');

// CRUD
router.get('/', verifyToken, customersController.listCustomers);
router.get('/:id', verifyToken, customersController.getCustomer);
router.post('/', verifyToken, customersController.createCustomer);
router.put('/:id', verifyToken, customersController.updateCustomer);
router.delete('/:id', verifyToken, customersController.deleteCustomer);

// Orders & Invoices for a customer
router.get('/:id/orders', verifyToken, customersController.getCustomerOrders);
router.get('/:id/invoices', verifyToken, customersController.getCustomerInvoices);

module.exports = router;
