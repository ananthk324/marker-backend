const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const sequelize = require("./utils/dbConnection");

const auth = require("./routes/auth");
const user = require("./routes/user");
const admin = require("./routes/admin");

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(morgan("combined"));

// allow cors requests
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.use("/auth", auth);
app.use("/user", user);
app.use("/admin", admin);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
