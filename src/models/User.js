const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  plate: String,
  password: String,
  type: {
    type: String,
    default: "motorista"
  }
});

module.exports = mongoose.model("User", UserSchema);
