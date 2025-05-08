const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
} = require('../controllers/invoice.controller');

// Apply authentication middleware to all invoice routes
router.use(verifyToken);

// Invoice routes
router.post('/', isAdmin, createInvoice);
router.get('/', getInvoices);
router.get('/:id', getInvoiceById);
router.put('/:id', isAdmin, updateInvoice);
router.delete('/:id', isAdmin, deleteInvoice);

module.exports = router;