const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  driver: String,
  average: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Event", EventSchema);
