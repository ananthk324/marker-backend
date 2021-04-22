const express = require("express");
const router = express.Router();
const { getGoogleAuthURL } = require("../utils/oauth");
const { authenticateUser } = require("../controllers/auth/user");
const { refreshTokens } = require("../controllers/auth/common");

router.get("/login", (req, res) => res.redirect(getGoogleAuthURL()));

router.get(
  "/google/redirect",
  async (req, res) => await authenticateUser(req, res)
);

router.post("/refresh", async (req, res) => await refreshTokens(req, res));

module.exports = router;
