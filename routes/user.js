const express = require("express");
const router = express.Router();
const { profile } = require("../controllers/user/profile");
const { verifyAccessToken } = require("../controllers/auth/common");

router.get("/profile", verifyAccessToken, (req, res) => profile(req, res));

module.exports = router;