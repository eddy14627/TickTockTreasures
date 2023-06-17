import express from "express";
const router = express.Router();
import { checkoutSession } from "../controllers/stripeController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, checkoutSession);

export default router;