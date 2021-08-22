const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    file: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

FileSchema.virtual("file_url").get(function () {
  return `https://backendconsorcio.herokuapp.com/files/${this.file}`;
});

module.exports = mongoose.model("File", FileSchema);
