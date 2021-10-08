const mongoose = require("mongoose");
const dataCurrent = require("../config/date");

const CarSchema = new mongoose.Schema({
  car: String,
  categorie: String,
  sector: {
    type: String,
    default: "Bilhetagem"
  },
  group: [{}],
  liberated: String,
  status: String,
  createdAt: {
    type: String,
    default: dataCurrent
  }
});

module.exports = mongoose.model("Car", CarSchema);
