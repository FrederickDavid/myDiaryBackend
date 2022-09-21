const userModel = require("../model/userModel");
const diaryModel = require("../model/diaryModel");
const mongoose = require("mongoose");

const getAllDiary = async (req, res) => {
  try {
    const diary = await diaryModel.find().sort({ word: "asc" });

    res.status(200).json({
      message: "All Diary Found Successfully",
      data: diary,
    });
  } catch (error) {
    res.status(404).json({
      message: "No Diary Found in this Database",
      error: error.message,
    });
  }
};

const getDiary = async (req, res) => {
  try {
    const diary = await diaryModel.findById(req.params.diaryID);

    res.status(200).json({
      message: "Diary Found Successfully",
      data: diary,
    });
  } catch (error) {
    res.status(404).json({
      message: "No Diary with such ID in this Database",
      error: error.message,
    });
  }
};

const createDiary = async (req, res) => {
  try {
    const { word } = req.body;
    const getUser = await userModel.findById(req.params.id);
    const diaryContent = new diaryModel({
      word,
    });

    diaryContent.user = getUser;
    diaryContent.save();

    getUser.diary.push(mongoose.Types.ObjectId(diaryContent._id));
    getUser.save();

    res.status(201).json({
      message: "Diary Created Successfully",
      data: diaryContent,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable to Create Diary",
      error: error.message,
    });
  }
};

const deleteDiary = async (req, res) => {
  try {
    const diary = await diaryModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Diary Deleted Successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable to Delete Diary",
      error: error.message,
    });
  }
};

const updateDiary = async (req, res) => {
  try {
    const { word } = req.body;

    const updateData = await diaryModel.findByIdAndUpdate(
      req.params.diaryID,
      req.body,
      { new: true }
    );
    res.status(201).json({
      message: "Diary Updated Successfully",
      data: updateData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable to Update Diary",
      error: error.message,
    });
  }
};

module.exports = {
  getAllDiary,
  getDiary,
  createDiary,
  deleteDiary,
  updateDiary,
};
