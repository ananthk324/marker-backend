const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const { DB_NAME, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize({
  dialect: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
  define: {
    freezeTableName: true,
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
})();

module.exports = sequelize;
