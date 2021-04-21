const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/generateAccessToken");
const { getGoogleUser } = require("../../utils/oauth");
const { CLIENT_BASE_URL } = process.env;

const usersArray = [{ email: "ananthk324@gmail.com" }];

const authenticateUser = async (req, res) => {
  try {
    const code = req.query.code;
    const user = await getGoogleUser(code);

    console.log(user);

    const __user = usersArray.find(_user => _user.email === user.email);

    if (!__user) return res.redirect(`${CLIENT_BASE_URL}`);

    const accessToken = generateAccessToken(__user.email);
    const refreshToken = generateRefreshToken(__user.email);

    return res.redirect(
      `${CLIENT_BASE_URL}/#access_token=${accessToken}&refresh_token=${refreshToken}`
    );
  } catch (e) {
    console.log(e);
    return res.redirect(`${CLIENT_BASE_URL}`);
  }
};

module.exports = { authenticateUser };
