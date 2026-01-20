import express from "express";
import {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/category.js";

const router = express.Router();

// 📂 Get all categories / Create category
router.route("/")
  .get(getAllCategories)
  .post(createCategory);

// 📁 Single category operations
router.route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
