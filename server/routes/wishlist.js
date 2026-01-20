import express from "express";

import {
  getAllWishlistByUserId,
  getAllWishlist,
  createWishItem,
  deleteWishItem,
  getSingleProductFromWishlist,
} from "../controllers/wishlist.js";

const router = express.Router();

/**
 * 🟢 Public / Admin Routes
 */
router.route("/")
  .get(getAllWishlist)
  .post(createWishItem);

/**
 * 🧑 User-specific Wishlist
 */
router.get("/:userId", getAllWishlistByUserId);

router.route("/:userId/:productId")
  .get(getSingleProductFromWishlist)
  .delete(deleteWishItem);

export default router;
