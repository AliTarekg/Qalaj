const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const {
    createInquiry,
    getInquiries,
    getInquiryById,
    updateInquiry,
    deleteInquiry
} = require('../controllers/inquiry.controller');

// Public route for creating inquiries
router.post('/', createInquiry);

// Protected routes
router.use(verifyToken);
router.get('/', getInquiries);
router.get('/:id', getInquiryById);
router.put('/:id', updateInquiry);
router.delete('/:id', deleteInquiry);

module.exports = router;