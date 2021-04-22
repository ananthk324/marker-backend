const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/jwt");
const { getGoogleUser } = require("../../utils/oauth");
const { CLIENT_BASE_URL } = process.env;
const { User } = require("../../models");

const randomString = require("crypto")
  .randomBytes(256)
  .toString("base64")
  .slice(0, 50);

const authenticateUser = async (req, res) => {
  try {
    const code = req.query.code;
    const user = await getGoogleUser(code);

    if (!user)
      return res.redirect(`${CLIENT_BASE_URL}#${randomString}&errcode=404`);

    console.log(user);

    const __user = await User.findOne({ where: { email: user.email } });

    if (!__user)
      return res.redirect(`${CLIENT_BASE_URL}#${randomString}&errcode=401`);

    const accessToken = generateAccessToken({
      email: __user.email,
      is_manager: __user.is_manager ? true : false,
    });

    const refreshToken = generateRefreshToken({
      email: __user.email,
      is_manager: __user.is_manager ? true : false,
    });

    return res.redirect(
      `${CLIENT_BASE_URL}/#access_token=${accessToken}&refresh_token=${refreshToken}`
    );
  } catch (e) {
    console.log(e);
    return res.redirect(`${CLIENT_BASE_URL}/#${randomString}&errcode=500`);
  }
};

module.exports = { authenticateUser };
