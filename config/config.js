const dotenv = require("dotenv");
dotenv.config();

const { DB_NAME, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
  dev: {
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
  },
};
