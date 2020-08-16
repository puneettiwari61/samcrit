var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true
    },
    eventType: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true,
      min: 6
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    organiser: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", userSchema);
