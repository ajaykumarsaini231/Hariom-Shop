import express from "express";
import { uploadMainImage } from "../controllers/mainImages.js";

const router = express.Router();

// 📸 Upload main image
router.post("/", uploadMainImage);

export default router;
