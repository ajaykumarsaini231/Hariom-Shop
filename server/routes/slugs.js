import express from "express";
import { getProductBySlug } from "../controllers/slugs.js";

const router = express.Router();

// 🔗 Get product by slug
router.get("/:slug", getProductBySlug);

export default router;
