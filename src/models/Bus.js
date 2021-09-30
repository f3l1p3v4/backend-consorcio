const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  bus: String,
  categorie: String,
  group: String,
  status: String
});

module.exports = mongoose.model("Bus", BusSchema);
