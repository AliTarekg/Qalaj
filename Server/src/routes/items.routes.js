const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const itemsController = require('../controllers/items.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Move upload route before verifyToken for CRUD, so /api/items/upload does not require an id
router.post('/upload', verifyToken, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// CRUD
router.get('/', verifyToken, itemsController.listItems);
router.get('/:id', verifyToken, itemsController.getItem);
router.post('/', verifyToken, itemsController.createItem);
router.put('/:id', verifyToken, itemsController.updateItem);
router.delete('/:id', verifyToken, itemsController.deleteItem);

module.exports = router;
