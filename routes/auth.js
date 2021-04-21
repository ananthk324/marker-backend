const express = require("express");
const router = express.Router();
const { getGoogleAuthURL } = require("../utils/oauth");
const { authenticateUser } = require("../controllers/auth/user");

router.get("/login", (req, res) => res.redirect(getGoogleAuthURL()));

router.get(
  "/google/redirect",
  async (req, res) => await authenticateUser(req, res)
);

module.exports = router;
