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

EventSchema.virtual("doc_url").get(function () {
  return `http://localhost:3333/files/${this.doc}`;
});

module.exports = mongoose.model("Event", EventSchema);
