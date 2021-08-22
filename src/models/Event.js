const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  events: Array,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Event", EventSchema);
