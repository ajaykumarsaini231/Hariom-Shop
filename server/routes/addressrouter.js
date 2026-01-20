import express from "express";
import {
  getAddressesByUserId,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";

import { identifier } from "../middleware/identifier.js";

const router = express.Router();

// 🧱 Protect all routes using JWT middleware
router.use(identifier);

// 🧾 Get all addresses for a specific user
router.get("/:userId", getAddressesByUserId);

// ➕ Create a new address
router.post("/", createAddress);

// ✏️ Update an existing address
router.put("/:id", updateAddress);

// 🗑️ Delete an address
router.delete("/:id", deleteAddress);

export default router;
