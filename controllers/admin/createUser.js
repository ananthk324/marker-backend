const { User } = require("../../models");
const {
  badRequestTemplate,
  serverErrorTemplate,
  dataTemplate,
} = require("../../utils/responseTemplates");

const createUser = async (req, res) => {
  try {
    const user = req.user;
    const newUser = req.body;

    if (user && !user.is_manager)
      return badRequestTemplate(res, "User has no admin privileges.");

    if (!newUser) return badRequestTemplate(res, "No new user data in req.");

    const mandatoryFields = ["name", "email"];

    for (let field of mandatoryFields) {
      if (!newUser[field]) {
        return badRequestTemplate(
          res,
          `Missing mandatory field - ${field} in req.`
        );
      }
    }

    const doesUserExists = await User.findOne({
      where: { email: newUser.email },
    });

    if (doesUserExists) return badRequestTemplate(res, "User already exists.");

    const createdUser = await User.create({
      name: newUser.name,
      email: newUser.email,
    });

    return dataTemplate(
      res,
      { email: createdUser.email },
      { message: "User created!" }
    );
  } catch (e) {
    console.log(e);
    return serverErrorTemplate(res, e.message);
  }
};

module.exports = { createUser };
