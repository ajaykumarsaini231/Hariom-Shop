import express from "express";
import {
  createOrderProduct,
  updateProductOrder,
  deleteProductOrder,
  getProductOrder,
  getAllProductOrders,
} from "../controllers/customer_order_product.js";

import { identifier } from "../middleware/identifier.js";

const router = express.Router();

/**
 * 🟢 Public Routes
 */
router.get("/", getAllProductOrders);
router.get("/:id", getProductOrder);

/**
 * 🔒 Protected Routes — require JWT
 */
router.post("/", identifier, createOrderProduct);
router.put("/:id", identifier, updateProductOrder);
router.delete("/:id", identifier, deleteProductOrder);

export default router;
