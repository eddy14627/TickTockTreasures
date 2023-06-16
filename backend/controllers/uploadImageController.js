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
// const uploadToCloudinary = asyncHandler(async (req, res) => {
//   console.log(req.body);
//   const result = await cloudinary.uploader.upload(req.files.image.path, {
//     public_id: `${Date.now()}`,
//     resource_type: "auto",
//   });
//   return res.status(201).json({
//     url: result.secure_url,
//     public_id: result.public_id,
//   });
// });

// const uploadToCloudinary = asyncHandler(async (req, res) => {
//   // console.log(req.body);
//   // console.log(req.files);
//   console.log(req.files.image.path);
//   // console.log("cloud name : ", process.env.CLOUD_NAME);
//   // console.log("api key : ", process.env.API_KEY);
//   // console.log("api secreat : ", process.env.API_SECRET);
//   const result = await cloudinary.v2.uploader.upload(req.files.image.path);
//   console.log("upload image:", result);
//   return res.status(201).json({
//     url: result.secure_url,
//     public_id: result.public_id,
//   });
// });

const uploadToCloudinary = async (req, res) => {
  try {
    let result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });

    return res
      .status(200)
      .json({ public_id: result.public_id, url: result.secure_url });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Cant Upload Images", err: err.message });
  }
};

router.post(
  "/",
  // expressFormidable({ maxFieldsSize: 5 * 1024 * 1024 }),
  uploadToCloudinary
);

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
