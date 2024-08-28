const express = require("express");
const router = express.Router();
const {
  getBadges,
  setBadge,
  updateBadge,
  deleteBadge,
  getBadge,
} = require("../controllers/badgeController");

router.route("/").get(getBadges).post(setBadge);
router.route("/:id").delete(deleteBadge).put(updateBadge);
router.get("/id/:id", getBadge);

module.exports = router;
