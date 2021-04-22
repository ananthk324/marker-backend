module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "attendance",
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
          },
          userId: {
            type: Sequelize.INTEGER,
            references: {
              model: "user",
              key: "id",
            },
          },
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
          createdAt: {
            type: Sequelize.DATE,
          },
          updatedAt: {
            type: Sequelize.DATE,
          },
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("attendance", { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
