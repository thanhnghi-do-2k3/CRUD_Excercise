const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("user-management");
};

controller.add = async (req, res) => {
  let { username, password, firstName, lastName, mobile, isAdmin } = req.body;
  try {
    await models.User.create({
      username,
      password,
      firstName,
      lastName,
      mobile,
      isAdmin: isAdmin == "1" ? true : false,
    });
    res.status(200).redirect("/users");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

controller.edit = async (req, res) => {
  let { id, username, firstName, lastName, mobile, isAdmin } = req.body;
  try {
    await models.User.update(
      {
        username,
        firstName,
        lastName,
        mobile,
        isAdmin: isAdmin == "1" ? true : false,
      },
      { where: { id } }
    );
    res.status(200).send("User updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
};


controller.delete = async (req, res) => {
  let { id } = req.body;
  try {
    await models.User.destroy({ where: { id } });
    res.status(200).send("User deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = controller;
