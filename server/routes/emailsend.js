import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Subscription from "../models/Subscription.js";

dotenv.config();

const router = express.Router();

// POST route to send emails
router.post("/send-email", async (req, res) => {
  const { from, subject, message } = req.body;

  if (!from || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Fetch the email list from the database
    const subscription = await Subscription.findOne();
    const emailList = subscription?.email_list || [];

    if (emailList.length === 0) {
      return res.status(400).json({ message: "No emails to send." });
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email provider
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // Fetch user from env
        pass: process.env.EMAIL_PASS, // Fetch pass from env
      },
    });

    const mailOptions = {
      from: `"Your Name or Company" <${from}>`, // Add a name for better deliverability
      subject,
      text: `${message}\n\nTo unsubscribe, visit: https://cosmicjourney.vercel.app/profile`, // Plain-text version of the message
      html: `<p>${message.replace(
        /\n/g,
        "<br>"
      )}</p><p>To <a href="https://cosmicjourney.vercel.app/profile">unsubscribe</a>, click here.</p>`, // HTML version of the message
      headers: {
        "X-Priority": "3",
        "X-Mailer": "Nodemailer",
      },
    };

    // Send emails to each address in the list
    for (const email of emailList) {
      await transporter.sendMail({ ...mailOptions, to: email });
    }

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Failed to send emails." });
  }
});

export default router;
