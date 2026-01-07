const express = require('express');
const router = express.Router();
const { identifier } = require("../middleware/indentifier.js"); // 👈 Auth middleware
const { adminIdentifier } = require("../middleware/adminIdentifier.js");

const {
  getSingleProductImages,
  createImage,
  updateImage,
  deleteImage
} = require('../controllers/productImages');

// ================================
// 🧩 Route: Product Images
// ================================

// // Get all images for a product
router.get('/:id', getSingleProductImages);

// Create new product image (secured)
router.post('/', adminIdentifier, createImage);

// Update image (secured)
router.put('/:id', adminIdentifier, updateImage);

// Delete image (secured)
router.delete('/:id', adminIdentifier, deleteImage);

// // Get all images for a product
// router.get('/:id', getSingleProductImages);

// // Create new product image (secured)
// router.post('/',  createImage);

// // Update image (secured)
// router.put('/:id', updateImage);

// // Delete image (secured)
// router.delete('/:id', deleteImage);

module.exports = router;
