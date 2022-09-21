const likeModel = require("../model/likeModel");
const diaryModel = require("../model/diaryModel");
const mongoose = require("mongoose");

const createMyLike = async (req, res) => {
  try {
    const user = await likeModel.findById(req.params.id);

    if (user) {
      res.status(201).json({
        message: "User Has Already liked Before",
      });
    } else {
      const createDiary = await diaryModel.findById(req.params.diary);
      const newDiary = new likeModel({ _id: req.params.id });

      newDiary.diary = createDiary;
      newDiary.save();

      createDiary.like.push(mongoose.Types.ObjectId(newDiary._id));
      createDiary.save();

      res.status(201).json({
        message: "Like has been Added",
        data: newDiary,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getMyLike = async (req, res) => {
  try {
    const diary = await diaryModel.findById(req.params.diary).populate("like");

    res.status(200).json({
      message: " Like Gotten Successfully",
      data: diary,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const deleteMyLike = async (req, res) => {
  try {
    const getDiary = await diaryModel.findById(req.params.diary);
    const remove = await likeModel.findByIdAndRemove(req.params.like);

    getDiary.like.pull(remove);
    getDiary.save();

    res.status(201).json({
      message: "Like Deleted Successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMyLike,
  createMyLike,
  deleteMyLike,
};
