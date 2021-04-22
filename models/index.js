const models = {
  User: require("./user"),
  Attendance: require("./attendance"),
};

// Map associations / relations for all models
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
