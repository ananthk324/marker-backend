const Sequelize = require("sequelize");
const sequelize = require("../utils/dbConnection");

const Attendance = sequelize.define("attendance", {
  day: {
    type: Sequelize.DATEONLY,
  },
  present: {
    type: Sequelize.BOOLEAN,
  },
  leave: {
    type: Sequelize.BOOLEAN,
  },
  leave_half_day: {
    type: Sequelize.BOOLEAN,
  },
  leave_full_day: {
    type: Sequelize.BOOLEAN,
  },
  leave_type: {
    type: Sequelize.STRING,
  },
  marked_timestamp: {
    type: Sequelize.DATE,
  },
});

Attendance.associate = models => {
  Attendance.belongsTo(models.User);
};

module.exports = Attendance;
