import express, { urlencoded } from "express";
import mongoose from "mongoose";
import articleRoutes from "./routes/articleRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import emailRouter from "./routes/emailsend.js"; // Import the email route
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Get MongoDB URL from environment variables
const url = process.env.MONGODB_URL;

// Middleware to handle JSON and URL-encoded data
app.use(express.json({ limit: "30mb", extended: true }));
app.use(urlencoded({ limit: "30mb", extended: true }));

// Use CORS middleware
app.use(cors({ origin: "https://cosmicjourney.vercel.app" }));
app.use(cors({ origin: "http://localhost:5173" }));

// Define routes
app.use("/article", articleRoutes);
app.use("/subscription", subscriptionRoutes);
app.use("/email", emailRouter); // Add email routes

// Serve index.html for root route
app.get("/", (req, res) => {
  res.send("Welcome to Dev Labs Server");
});

// Connect to MongoDB and start the server
mongoose
  // .connect("mongodb://localhost:27017/Beyond-Infinity", {
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(5000, () =>
      console.log("Database connected. Server running on port 5000")
    )
  )
  .catch((err) => console.log(err));
