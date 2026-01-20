import express from "express";
import {
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/controllerCart.js";

import { identifier } from "../middleware/identifier.js";

const router = express.Router();

// 🧱 Protect all routes using JWT middleware
router.use(identifier);

// ➕ Add item to cart
router.post("/", addToCart);

// 🛒 Get cart by user ID
router.get("/:userId", getUserCart);

// ✏️ Update cart item
router.put("/:id", updateCartItem);

// ❌ Remove single cart item
router.delete("/:id", removeCartItem);

// 🧹 Clear entire cart for a user
router.delete("/clear/:userId", clearCart);

export default router;
