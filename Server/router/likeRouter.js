const express = require("express");
const {
  getMyLike,
  createMyLike,
  deleteMyLike,
} = require("../controller/likeController");
const router = express.Router();

router.route("/:diary/like").post(createMyLike);
router.route("/").get(getMyLike);

router.route("/:id/:diary/like/:like").delete(deleteMyLike);

module.exports = router;
