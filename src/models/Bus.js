const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  bus: String,
  categorie: String,
  group: [
    {
      item: String
    }
  ],
  status: String
});

module.exports = mongoose.model("Bus", BusSchema);
