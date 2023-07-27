import { config } from "dotenv";

config({ path: "./config/config.env" });

import app from "./app.js";
import connectDB from "./config/Database.js";
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// Set the cookie with SameSite=None and Secure
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`your app is running on: http://localhost:${PORT}`)
);
