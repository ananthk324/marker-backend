const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/admin/createUser");
const { verifyAccessToken } = require("../controllers/auth/common");

router.post(
  "/create/user",
  verifyAccessToken,
  async (req, res) => await createUser(req, res)
);

module.exports = router;
