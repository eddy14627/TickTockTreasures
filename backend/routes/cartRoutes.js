import express from "express";
const router = express.Router();
import {
  getCartItems,
  addToCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

// Fetch user's cart items
router.route("/:userId").get(protect, getCartItems);

// Add item to cart
router.route("/add").post(protect, addToCart);

// Remove specific item from cart
router.route("/remove").delete(protect, removeFromCart);

// Clear entire cart
router.route("/clear").delete(protect, clearCart);

export default router;
