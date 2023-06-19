import express from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/", upload.array("images", 5), (req, res) => {
  // Get the uploaded files
  console.log(req.files);
  const files = req.files;

  // Upload each file to Cloudinary
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, (err, result) => {
        if (err) {
          console.error("Error uploading file:", err);
          reject(err);
        } else {
          // File uploaded successfully
          console.log("Upload result:", result);
          resolve(result.secure_url);
        }

        // Remove the temporary file
        fs.unlinkSync(file.path);
      });
    });
  });

  // Wait for all uploads to finish
  Promise.all(uploadPromises)
    .then((imageUrls) => {
      // Send the response with the uploaded image URLs
      console.log("Image URLs:", imageUrls);
      //   res.json({ imageUrls });
      res.send({
        message: "Images uploaded successfully",
        images: imageUrls,
      });
    })
    .catch((error) => {
      console.error("Error uploading files:", error);
      res.status(500).json({ error: "Failed to upload files" });
    });
});

export default router;
