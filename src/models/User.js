const mongoose = require("mongoose");
const dataCurrent = require("../config/date");

const UserSchema = new mongoose.Schema({
  name: String,
  company: String,
  plate: String,
  password: String,
  type: {
    type: String,
    default: "motorista"
  },
  createdAt: {
    type: String,
    default: dataCurrent
  }
});

module.exports = mongoose.model("User", UserSchema);
