const jwt = require("jsonwebtoken");
const responseTemplates = require("./responseTemplates");

const generateAccessToken = email =>
  jwt.sign(email, process.env.JWT_SECRET, { expiresIn: 1800 });

const authenticateToken = (req, res, next) => {
  const token = req.headers["access-token"];

  if (!token)
    return responseTemplates.unAuthorizedTemplate(res, "Missing auth headers!");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err);

    if (err)
      return responseTemplates.unAuthorizedTemplate(
        res,
        "Authentication failed, contact admin."
      );

    req.user = user;

    next();
  });
};

module.exports = { generateAccessToken, authenticateToken };
