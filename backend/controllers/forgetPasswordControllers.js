import { sendEmail } from "../utils/sendEmail.js";
import { Otp } from "../models/otpModel.js";
import User from "../models/userModel.js";
import path from "path";
import randomstring from "randomstring";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const otp = randomstring.generate({
      length: 4,
      charset: "numeric",
    });
    console.log(__dirname);
    const filePath = path.resolve(
      __dirname,
      "../emailTemplate/forgetPassword.html"
    );
    const details = {
      user: existingUser.name,
      otp: otp,
    };
    try {
      await sendEmail(filePath, details, email, "OTP");
    } catch (error) {
      console.log("Problem in sending email");
      console.log(error);
    }
    await new Otp({
      email,
      otp,
      created_at: Date.now(),
    }).save();
    return res.status(200).json({ message: "OTP Send Successfully !!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const existingEmail = await User.findOne({ email: email });
    if (!existingEmail) {
      return res.status(400).json({ message: "Email Not Found" });
    }
    const existingOtp = await Otp.find({ email: email });
    if (existingOtp[existingOtp.length - 1].otp !== otp) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }
    return res.status(200).json({ message: "OTP Verified Sucessfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "Email Not Found" });
    }
    existingUser.password = password;
    await existingUser.save();
    return res
      .status(200)
      .json({ message: "Password changed successfully !!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
