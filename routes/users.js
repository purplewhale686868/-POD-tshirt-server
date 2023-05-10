import express from "express";
import User from "../models/User.js";
import Listing from "../models/Listing.js";

import { verifyToken } from "../verifyToken.js";

const router = express.Router();

/* getUser */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// get user's listings
router.get("/:userId/listings", verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const listings = await Listing.find({ userId });
    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

export default router;
