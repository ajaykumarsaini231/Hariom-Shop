import express from "express";
import { identifier } from "../middleware/identifier.js";

import {
  getCustomerOrder,
  createCustomerOrder,
  updateCustomerOrder,
  deleteCustomerOrder,
  getAllOrders,
  getUserOrders,
} from "../controllers/customer_orders.js";

const router = express.Router();

// 🔒 Protect all routes
router.use(identifier);

// 📦 Get all orders / Create order
router.route("/")
  .get(getAllOrders)
  .post(createCustomerOrder);

// 👤 Get orders by user
router.get("/user/:userId", getUserOrders);

// 📄 Single order operations
router.route("/:id")
  .get(getCustomerOrder)
  .put(updateCustomerOrder)
  .delete(deleteCustomerOrder);

export default router;
