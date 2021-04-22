const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/admin/createUser");
const { reportOfDay } = require("../controllers/admin/reportOfDay");
const { verifyAccessToken } = require("../middlewares/auth/verifyAccessToken");

router.post(
  "/create/user",
  verifyAccessToken,
  async (req, res) => await createUser(req, res)
);

router.get(
  "/report/:day",
  verifyAccessToken,
  async (req, res) => await reportOfDay(req, res)
);

module.exports = router;
