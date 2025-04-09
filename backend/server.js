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

const port = process.env.PORT || 5000;

connectDB();

const app = express();

/*
Purpose: This middleware parses incoming requests with JSON payloads.​

Use Case: When a client sends data in JSON format, such as 
{"name": "John", "age": 30}, this middleware converts it into 
a JavaScript object accessible via req.body in your route handlers. ​
*/
app.use(express.json());

/*
Purpose: This middleware parses incoming requests with URL-encoded payloads, 
typically from HTML form submissions.​

Use Case: When a user submits a form on a webpage, this middleware processes
the form data, making it available in req.body as a JavaScript object. ​
*/
app.use(express.urlencoded({ extended: true }));

/*
Purpose: This middleware parses cookies attached to the client's request.

Use Case: If your application uses cookies to store
user preferences or session information, cookieParser()
enables you to access this data via req.cookies.
*/
app.use(cookieParser());

app.use(cors());

app.use(
  cors({
    origin: ["https://ticktocktreasures.onrender.com", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/filters", filtersRoutes);
app.use("/api/forgetPassword", forgetRoutes);
app.use("/api/upload/upload-cloudinary", cloudinaryUpload);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

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

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
