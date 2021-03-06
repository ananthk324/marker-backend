const { google } = require("googleapis");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, BASE_URL } = process.env;

const oauth2Client = new google.auth.OAuth2(
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  `${BASE_URL}/auth/google/redirect`
);

const getGoogleAuthURL = () => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
};

const getGoogleUser = async code => {
  const { tokens } = await oauth2Client.getToken(code);

  // Fetch the user's profile with the access token and bearer
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    .then(({ data }) => data)
    .catch(err => {
      console.log(err);
      throw new Error(err.message);
    });

  return googleUser;
};

module.exports = { getGoogleAuthURL, getGoogleUser };
