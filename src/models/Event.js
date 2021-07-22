const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    doc: String
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

EventSchema.virtuals("doc_url").get(function () {
  return `https://backendconsorcio.herokuapp.com/files/${this.doc}`;
});

module.exports = mongoose.model("Event", EventSchema);
