import express from "express";
import mongoose from "mongoose";
import Subscription from "../models/Subscription.js";

const router = express.Router();

// Subscribe to the email list
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if there's an existing subscription document
    let subscription = await Subscription.findOne();

    if (!subscription) {
      // Create a new document if none exists
      subscription = new Subscription();
    }

    // Check if the email is already in the list
    if (subscription.email_list.includes(email)) {
      return res.status(200).json({ message: "Email is already subscribed." });
    }

    // Add email to the list if not already subscribed
    subscription.email_list.push(email);
    await subscription.save();
    return res.status(200).json({ message: "Successfully subscribed!" });
  } catch (error) {
    console.error("Error during subscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Unsubscribe from the email list
router.post("/unsubscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const subscription = await Subscription.findOne();

    if (subscription && subscription.email_list.includes(email)) {
      subscription.email_list = subscription.email_list.filter(
        (subscribedEmail) => subscribedEmail !== email
      );
      await subscription.save();
      return res
        .status(200)
        .json({ message: "Successfully unsubscribed!", isUnsubscribed: true });
    } else {
      return res.status(400).json({ message: "Email is not subscribed." });
    }
  } catch (error) {
    console.error("Error during unsubscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
