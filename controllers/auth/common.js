const { User } = require("../../models");
const {
  generateAccessToken,
  generateRefreshToken,
  authenticateRefreshToken,
} = require("../../utils/jwt");
const {
  unAuthorizedTemplate,
  dataTemplate,
  badRequestTemplate,
  serverErrorTemplate,
} = require("../../utils/responseTemplates");

const refreshTokens = async (req, res) => {
  try {
    if (!req.headers || !req.headers["refresh-token"])
      return badRequestTemplate(
        res,
        "Missing refresh-token in request header."
      );

    const refreshToken = req.headers["refresh-token"];
    const refreshTokenUser = authenticateRefreshToken(refreshToken);

    if (!refreshTokenUser)
      return unAuthorizedTemplate(res, "Invalid refresh token.");

    console.log(refreshTokenUser);

    // Check if user exists in DB
    const isUserValid = await User.findOne({
      where: { email: refreshTokenUser.email, removed: false },
    });

    if (!isUserValid) return unAuthorizedTemplate(res, "User not recognized.");

    const access_token = generateAccessToken({
      email: refreshTokenUser.email,
      is_manager: refreshTokenUser.is_manager,
      id: refreshTokenUser.id,
    });
    const refresh_token = generateRefreshToken({
      email: refreshTokenUser.email,
      is_manager: refreshTokenUser.is_manager,
      id: refreshTokenUser.id,
    });

    return dataTemplate(res, { access_token, refresh_token });
  } catch (err) {
    console.log(err);
    return serverErrorTemplate(res, err.message);
  }
};

module.exports = { refreshTokens };
