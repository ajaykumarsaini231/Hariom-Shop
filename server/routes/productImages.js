import express from "express";

import {
  getSingleProductImages,
  createImage,
  updateImage,
  deleteImage,
} from "../controllers/productImages.js";

import { adminIdentifier } from "../middleware/adminIdentifier.js";

const router = express.Router();

// ================================
// 🧩 Product Images Routes
// ================================

// 📸 Get all images for a product (public)
router.get("/:id", getSingleProductImages);

// ➕ Create product image (admin only)
router.post("/", adminIdentifier, createImage);

// ✏️ Update product images (admin only)
router.put("/:id", adminIdentifier, updateImage);

// 🗑️ Delete product images (admin only)
router.delete("/:id", adminIdentifier, deleteImage);

export default router;
