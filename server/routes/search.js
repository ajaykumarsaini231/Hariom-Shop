import express from "express";
import { searchProducts } from "../controllers/search.js";

const router = express.Router();

// 🔍 Search products
router.get("/", searchProducts);

export default router;
