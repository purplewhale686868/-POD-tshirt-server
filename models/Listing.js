import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },

    // png path
    pngPath: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      default: 10,
    },
    colors: [
      {
        colorName: {
          type: String,
          required: true,
        },
        // t-shirt picture path
        colorPath: {
          type: String,
          required: true,
        },
      },
    ],

    sizes: {
      type: Array,
      default: ["XS", "S", "M", "L", "XL"],
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", ListingSchema);
export default Listing;
