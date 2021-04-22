const express = require("express");
const router = express.Router();
const { profile } = require("../controllers/user/profile");
const { markAttendance } = require("../controllers/user/markAttendance");
const { verifyAccessToken } = require("../middlewares/auth/verifyAccessToken");

router.get(
  "/profile",
  verifyAccessToken,
  async (req, res) => await profile(req, res)
);

router.post(
  "/mark",
  verifyAccessToken,
  async (req, res) => await markAttendance(req, res)
);

module.exports = router;
