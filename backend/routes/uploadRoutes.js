import path from "path";
import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// If production, use Render server's data folder, else use local uploads folder
const uploadFolder =
  process.env.NODE_ENV === "production" ? "/var/data/uploads/" : "uploads/";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadFolder);
  },
  filename(req, file, cb) {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb({ message: "Images only!" });
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.array("images", 5), (req, res) => {
  const imagePaths = req.files.map((file) => `/${file.path}`);
  console.log(imagePaths);
  res.send({
    message: "Images uploaded successfully",
    images: imagePaths,
  });
});

export default router;
