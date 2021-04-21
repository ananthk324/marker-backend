const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
} = process.env;

const generateAccessToken = email =>
  jwt.sign({ email }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });

const generateRefreshToken = email =>
  jwt.sign({ email }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

const authenticateToken = token =>
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return false;
    return user;
  });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken,
};
