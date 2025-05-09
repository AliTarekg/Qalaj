const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const invoicesController = require('../controllers/invoices.controller');

// CRUD
router.get('/', verifyToken, invoicesController.listInvoices);
router.get('/:id', verifyToken, invoicesController.getInvoice);
router.post('/', verifyToken, invoicesController.createInvoice);
router.put('/:id', verifyToken, invoicesController.updateInvoice);
router.delete('/:id', verifyToken, invoicesController.deleteInvoice);

// Payments for an invoice
router.get('/:id/payments', verifyToken, invoicesController.getInvoicePayments);
router.post('/:id/payments', verifyToken, invoicesController.createPayment);

module.exports = router;
