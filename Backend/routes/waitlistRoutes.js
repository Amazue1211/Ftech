import express from "express";
import Waitlist from "../models/Waitlist.js";

const router = express.Router();

router.post("/waitlist", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existing = await Waitlist.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const newEntry = new Waitlist({ email });
    await newEntry.save();

    res.status(200).json({ message: "Successfully added to waitlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;