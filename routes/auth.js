const express = require("express");
const router = express.Router();
const {
  dataTemplate,
  serverErrorTemplate,
} = require("../utils/responseTemplates");
const { getGoogleAuthURL, getGoogleUser } = require("../utils/oauth");

router.get("/login", (req, res) => {
  console.log("Google login.");
  res.redirect(getGoogleAuthURL());
});

router.get("/google/redirect", async (req, res) => {
  try {
    const code = req.query.code;
    console.log(code);
    const user = await getGoogleUser(code);
    return dataTemplate(res, user);
  } catch (err) {
    console.log(err);
    return serverErrorTemplate(res, err.message);
  }
});

module.exports = router;
