const mongoose = require("mongoose");

const diaryModel = mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "likes",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("diarys", diaryModel);
