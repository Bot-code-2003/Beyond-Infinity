import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Subscription from "../models/Subscription.js";

dotenv.config();

const router = express.Router();

router.options("/send-email", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://cosmicjourney.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

// POST route to send emails
router.post("/send-email", async (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://cosmicjourney.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const { from, title, imageLink, description, articleLink, subject } =
    req.body;

  if (
    !from ||
    !title ||
    !imageLink ||
    !description ||
    !articleLink ||
    !subject
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Fetch email list from database
    let subscription;
    try {
      subscription = await Subscription.findOne();
    } catch (dbError) {
      console.error("Error fetching subscription data:", dbError);
      return res
        .status(500)
        .json({ message: "Failed to fetch subscription data." });
    }

    const emailList = subscription?.email_list || [];
    if (emailList.length === 0) {
      return res.status(400).json({ message: "No emails to send." });
    }

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `${from}>`,
      subject: `${subject}`,
      text: `Hello, \n\nHere's a new article from Cosmic Journey!\n\nTitle: ${title}\n\nDescription: ${description}\n\nRead Full Article: ${articleLink}\n\nIf you no longer wish to receive updates, you can unsubscribe here: https://cosmicjourney.vercel.app/profile`,
      html: `<div>...</div>`, // Your HTML template
    };

    // Send emails to the list
    for (const email of emailList) {
      try {
        await transporter.sendMail({ ...mailOptions, to: email });
      } catch (emailError) {
        console.error(`Failed to send email to ${email}:`, emailError);
      }
    }

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Failed to send emails." });
  }
});

export default router;
