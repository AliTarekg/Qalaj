const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const inquiriesController = require('../controllers/inquiries.controller');

// List all inquiries
router.get('/', verifyToken, inquiriesController.listInquiries);
// Get single inquiry
router.get('/:id', verifyToken, inquiriesController.getInquiry);
// Create new inquiry
router.post('/', verifyToken, inquiriesController.createInquiry);
// Update inquiry
router.put('/:id', verifyToken, inquiriesController.updateInquiry);
// Delete inquiry
router.delete('/:id', verifyToken, isAdmin, inquiriesController.deleteInquiry);

// Follow-ups for an inquiry
router.get('/:inquiryId/follow-ups', verifyToken, inquiriesController.listFollowUps);
router.post('/:inquiryId/follow-ups', verifyToken, inquiriesController.createFollowUp);

module.exports = router;
