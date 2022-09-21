const express = require("express");
const {
  getAllDiary,
  getDiary,
  createDiary,
  deleteDiary,
  updateDiary,
} = require("../controller/diaryController");
const router = express.Router();

router.route("/").get(getAllDiary);
router.route("/:id/createDiary").post(createDiary);
router
  .route("/:id/:diaryID")
  .get(getDiary)
  .patch(updateDiary)
  .delete(deleteDiary);

module.exports = router;
