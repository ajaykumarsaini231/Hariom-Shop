import express from "express";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductById,
  getProductsByCategoryId,
  getProductList,
  moveProductsToCategory,
  getProductsSplitByCategory,
} from "../controllers/products.js";

import { adminIdentifier } from "../middleware/adminIdentifier.js";

const router = express.Router();

/**
 * 🟢 Public Routes — no authentication required
 */
router.get("/list", getProductList);
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/category/:categoryId", getProductsByCategoryId);
router.get("/:id", getProductById);
router.get("/split/:categoryId", getProductsSplitByCategory);

/**
 * 🔒 Admin Routes — admin only
 */
router.put("/move-products", adminIdentifier, moveProductsToCategory);
router.post("/", adminIdentifier, createProduct);
router.put("/:id", adminIdentifier, updateProduct);
router.delete("/:id", adminIdentifier, deleteProduct);

export default router;
