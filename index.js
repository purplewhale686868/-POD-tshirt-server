import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cartRoutes from "./routes/carts.js";
import listingRoutes from "./routes/createListing.js";
import { uploadPNG } from "./routes/uploadPNG.js";
import { verifyToken } from "./verifyToken.js";
import stripeRoute from "./routes/stripe.js";

/* CONFIGURATIONS for module type */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["https://tee-society-app.onrender.com"],
  })
);

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// store files locally
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "public/assets");
  // },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/uploadPNG", verifyToken, upload.single("image"), uploadPNG);

/* API ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
// app.use("/pngFile", pngFileRoutes);
app.use("/listings", listingRoutes);
app.use("/carts", cartRoutes);
app.use("/checkout", stripeRoute);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
