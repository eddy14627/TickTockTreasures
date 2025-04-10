import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import filtersRoutes from "./routes/filtersRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import forgetRoutes from "./routes/PasswordChangeRoute.js";
import cloudinaryUpload from "./routes/CloudinaryRoutes.js";
import { corsOptions } from "./utils/additinalFunctions.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

/*
Purpose: This middleware parses incoming requests with JSON payloads.​
*/
app.use(express.json());

/*
Purpose: This middleware parses incoming requests with URL-encoded payloads.​
*/
app.use(express.urlencoded({ extended: true }));

/*
Purpose: This middleware parses cookies attached to the client's request.
*/
app.use(cookieParser());

/*
Purpose: Enable CORS with specific options to allow external resources.
*/

app.use(cors(corsOptions));

/*
Purpose: Adjust COEP headers to avoid blocking external resources.
*/
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin"); // Optional
  res.setHeader("Cross-Origin-Embedder-Policy", "credentialless"); // Less restrictive
  next();
});

/*
API routes for various functionalities.
*/
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/filters", filtersRoutes);
app.use("/api/forgetPassword", forgetRoutes);
app.use("/api/upload/upload-cloudinary", cloudinaryUpload);

/*
PayPal configuration route.
*/
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

/*
Serve static files for uploads.
*/
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

/*
Serve React frontend in production mode.
*/
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

/*
Error handling middleware.
*/
app.use(notFound);
app.use(errorHandler);

/*
Start the server.
*/
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
