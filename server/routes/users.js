import express from "express";

import { identifier } from "../middleware/identifier.js";
import { adminIdentifier } from "../middleware/adminIdentifier.js";

import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
} from "../controllers/users.js";

const router = express.Router();

/**
 * 🟢 Public Routes
 */
router.post("/", createUser);
router.get("/email/:email", getUserByEmail);

/**
 * 🔐 Authenticated User Routes
 */
router.get("/me", identifier, getCurrentUser);
router.put("/me", identifier, updateCurrentUser);
router.delete("/me", identifier, deleteCurrentUser);

/**
 * 🛡️ Admin Routes
 */
router.get("/", adminIdentifier, getAllUsers);
router.get("/:id", adminIdentifier, getUser);
router.put("/:id", adminIdentifier, updateUser);
router.delete("/:id", adminIdentifier, deleteUser);

export default router;
