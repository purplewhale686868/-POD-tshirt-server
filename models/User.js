import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 50,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      min: 5,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
