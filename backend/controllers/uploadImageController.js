import cloudinary from "cloudinary";
import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import expressFormidable from "express-formidable";
import asyncHandler from "../middleware/asyncHandler.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = asyncHandler(async (req, res) => {
  console.log(req.body);
  const result = await cloudinary.uploader.upload(req.files.image.path);
  return res.status(201).json({
    url: result.secure_url,
    public_id: result.public_id,
  });
});

router.post("/", protect, expressFormidable, uploadToCloudinary);

export default router;

// const opts = {
//   overwrite: true,
//   invalidate: true,
//   resource_type: "auto",
// };

// export const uploads = (req , res) => {
//   console.log(image);
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(image, opts, (error, result) => {
//       if (result && result.secure_url) {
//         console.log(result.secure_url);
//         resolve(result.secure_url);
//       } else {
//         console.log(error.message);
//         reject({ message: error.message });
//       }
//     });
//   });
// };
