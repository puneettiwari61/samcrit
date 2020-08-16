var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var noteSchema = new Schema(
  {
    note: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    uniqueUrl: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Note", noteSchema);
