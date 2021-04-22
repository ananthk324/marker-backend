const {
  generateAccessToken,
  generateRefreshToken,
  authenticateRefreshToken,
  authenticateAccessToken,
} = require("../../utils/generateAccessToken");
const {
  unAuthorizedTemplate,
  dataTemplate,
  badRequestTemplate,
} = require("../../utils/responseTemplates");

const refreshTokens = (req, res) => {
  if (!req.headers || !req.headers["refresh-token"])
    return badRequestTemplate(res, "Missing refresh-token in request header.");

  const refreshToken = req.headers["refresh-token"];
  const refreshTokenUser = authenticateRefreshToken(refreshToken);

  if (!refreshTokenUser)
    return unAuthorizedTemplate(res, "Invalid refresh token.");

  console.log(refreshTokenUser);

  const access_token = generateAccessToken({
    email: refreshTokenUser.email,
    is_manager: refreshTokenUser.is_manager,
  });
  const refresh_token = generateRefreshToken({
    email: refreshTokenUser.email,
    is_manager: refreshTokenUser.is_manager,
  });

  return dataTemplate(res, { access_token, refresh_token });
};

const verifyAccessToken = (req, res, next) => {
  if (!req.headers || !req.headers["access-token"])
    return unAuthorizedTemplate(res, "Missing access-token in request header.");

  const accessToken = req.headers["access-token"];

  const user = authenticateAccessToken(accessToken);

  if (!user) return unAuthorizedTemplate(res, "Invalid refresh token.");

  req.user = user;

  next();
};

module.exports = { refreshTokens, verifyAccessToken };
