const { authenticateAccessToken } = require("../../utils/jwt");
const { unAuthorizedTemplate } = require("../../utils/responseTemplates");

const verifyAccessToken = (req, res, next) => {
  if (!req.headers || !req.headers["access-token"])
    return unAuthorizedTemplate(res, "Missing access-token in request header.");

  const accessToken = req.headers["access-token"];

  const user = authenticateAccessToken(accessToken);

  if (!user) return unAuthorizedTemplate(res, "Invalid refresh token.");

  req.user = user;

  next();
};

module.exports = { verifyAccessToken };
