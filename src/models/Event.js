const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    thumbnail: String
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

EventSchema.virtual("thumbnail_url").get(function () {
  return `https://backendconsorcio.herokuapp.com/files/${this.thumbnail}`;
});

module.exports = mongoose.model("Event", EventSchema);
