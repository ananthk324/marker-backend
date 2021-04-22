const express = require("express");
const router = express.Router();
const { profile } = require("../controllers/user/profile");
const { markAttendance } = require("../controllers/user/markAttendance");
const { verifyAccessToken } = require("../middlewares/auth/verifyAccessToken");
const { todaysStatus } = require("../controllers/user/todaysStatus");

router.get(
  "/profile",
  verifyAccessToken,
  async (req, res) => await profile(req, res)
);

router.post(
  "/mark/:day",
  verifyAccessToken,
  async (req, res) => await markAttendance(req, res)
);

router.get(
  "/status",
  verifyAccessToken,
  async (req, res) => await todaysStatus(req, res)
);

module.exports = router;
