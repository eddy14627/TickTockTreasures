import express from "express";
import {
  changePassword,
  forgetPassword,
  verifyOtp,
} from "../controllers/forgetPasswordControllers.js";

const router = express.Router();

router.post("/changePassword", changePassword);
router.post("/verifyOtp", verifyOtp);
router.post("/sendOtp", forgetPassword);

export default router;
