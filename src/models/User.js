const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  plate: String,
  password: String,
  type: String
});

module.exports = mongoose.model("User", UserSchema);
