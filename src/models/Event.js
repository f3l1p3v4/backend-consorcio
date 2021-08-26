const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  car: String,
  driver: String,
  average: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Event", EventSchema);
