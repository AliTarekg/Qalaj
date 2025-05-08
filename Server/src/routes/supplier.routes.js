const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
} = require('../controllers/supplier.controller');

// Apply authentication middleware to all supplier routes
router.use(verifyToken);

// Supplier routes
router.post('/', isAdmin, createSupplier);
router.get('/', getSuppliers);
router.get('/:id', getSupplierById);
router.put('/:id', isAdmin, updateSupplier);
router.delete('/:id', isAdmin, deleteSupplier);

module.exports = router;