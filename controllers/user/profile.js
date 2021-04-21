const { dataTemplate } = require("../../utils/responseTemplates");

const profile = (req, res) => {
  console.log(req);

  return dataTemplate(res, req.user);
};

module.exports = { profile };
