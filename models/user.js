const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: Array,
});

const userModel = mongoose.model("user", UserSchema);

module.exports.models = {
  userModel,
};
