const Sequelize = require("sequelize");
const sequelize = require("../utils/dbConnection");

const User = sequelize.define(
  "user",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    is_manager: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    removed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

User.associate = models => {
  User.hasMany(models.Attendance);
};

module.exports = User;
