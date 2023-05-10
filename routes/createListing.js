import express from "express";
import Listing from "../models/Listing.js";

import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/newListing", verifyToken, async (req, res) => {
  try {
    const { userId, title, pngPath, colors } = req.body;

    const newListing = new Listing({
      userId,
      title,
      pngPath,
      colors,
      price: 10,
      sizes: ["XS", "S", "M", "L", "XL"],
    });
    await newListing.save();

    const listings = await Listing.find({ userId });
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get 1 listing
router.get("/find/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json(err);
  }
});
export default router;
