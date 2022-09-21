const mongoose = require("mongoose");

const likeModel = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    diary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diarys",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("likes", likeModel);
