const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
} = process.env;

const generateAccessToken = userData =>
  jwt.sign(userData, ACCESS_TOKEN_SECRET, {
    expiresIn: parseInt(ACCESS_TOKEN_EXPIRY),
  });

const generateRefreshToken = userData =>
  jwt.sign(userData, REFRESH_TOKEN_SECRET, {
    expiresIn: parseInt(REFRESH_TOKEN_EXPIRY),
  });

const authenticateAccessToken = token =>
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err.message);
      return false;
    }
    return user;
  });

const authenticateRefreshToken = token =>
  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err.message);
      return false;
    }
    return user;
  });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authenticateAccessToken,
  authenticateRefreshToken,
};
