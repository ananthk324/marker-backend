const { User } = require("../../models");
const {
  dataTemplate,
  serverErrorTemplate,
  notFoundTemplate,
} = require("../../utils/responseTemplates");

const profile = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) return serverErrorTemplate(res, "Failed to get user data.");

    const user = await User.findOne({ where: { id, removed: false } });

    if (!user) return notFoundTemplate(res, "User not found.");

    return dataTemplate(
      res,
      {
        name: user.name,
        email: user.email,
        is_manager: user.is_manager,
      },
      { message: "User profile." }
    );
  } catch (e) {
    console.log(e);
    return serverErrorTemplate(res, e.message);
  }
};

module.exports = { profile };
