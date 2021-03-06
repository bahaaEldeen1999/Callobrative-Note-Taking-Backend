const authentication = require("../utils/authentication");
const { userModel } = require("../models/user");

async function login(req, res) {
  try {
    const { username, password } = req.body;
    //console.log(req.body);
    const user = await userModel.findOne({
      username: username,
      password: password,
    });
    if (!user) throw new Error("wrong credentials");

    const token = authentication.createToken(user._id);
    res.status(200).send(token).end();
  } catch (ex) {
    //console.log(ex);
    res.status(400).send("error in login");
  }
}

async function signup(req, res) {
  try {
    const { username, password } = req.body;
    const user = new userModel({
      username: username,
      password: password,
      notes: [],
    });
    await user.save();
    if (!user) throw new Error("wrong credentials");

    const token = authentication.createToken(user._id);
    res.status(200).send(token).end();
  } catch (ex) {
    //console.log(ex);
    res.status(400).send("error in signup");
  }
}

module.exports = {
  login,
  signup,
};
