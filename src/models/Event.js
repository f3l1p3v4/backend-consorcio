const mongoose = require("mongoose");
const dataCurrent = require("../config/date");

const EventSchema = new mongoose.Schema({
  car: String,
  driver: String,
  average: String,
  company: String,
  createdAt: {
    type: String,
    default: dataCurrent
  }
});

module.exports = mongoose.model("Event", EventSchema);
