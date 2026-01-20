import express from "express";

import { adminIdentifier } from "../middleware/adminIdentifier.js";

import { getAdminStats, getRecentOrders } from "../controllers/adminStats.js";

import {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controllers/users.js";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";

import {
  createImage,
  updateImage,
  deleteImage,
} from "../controllers/productImages.js";

import {
  getAllOrders,
  updateCustomerOrder,
  deleteCustomerOrder,
} from "../controllers/customer_orders.js";

import { getMessages } from "../controllers/message.js";
import { getAllWishlist } from "../controllers/wishlist.js";

const router = express.Router();

// ✅ Protect all admin routes
router.use(adminIdentifier);

// 📊 Admin Dashboard
router.get("/stats", getAdminStats);
router.get("/recent-orders", getRecentOrders);

// 👥 Users
router.get("/users", getAllUsers);
router
  .route("/users/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

// 📦 Products
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// 🖼️ Product Images
router.post("/product-images", createImage);
router.put("/product-images/:id", updateImage);
router.delete("/product-images/:id", deleteImage);

// 🛒 Orders
router.get("/orders", getAllOrders);
router
  .route("/orders/:id")
  .put(updateCustomerOrder)
  .delete(deleteCustomerOrder);

// 💬 Messages
router.get("/messages", getMessages);

// 💖 Wishlist
router.get("/wishlist", getAllWishlist);

export default router;
