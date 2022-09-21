const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    verifiedToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
    diary: [{ type: mongoose.Schema.Types.ObjectId, ref: "diarys" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userModel);
