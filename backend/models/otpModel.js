import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    expires: 600,
  },
});

export const Otp = mongoose.model("Otp", otpSchema);
