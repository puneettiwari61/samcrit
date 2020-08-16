var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 6
    },

    events: [
      {
        type: Schema.Types.ObjectId
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", function(next) {
  if (this.password && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

userSchema.virtual("verifyPassword").get(function() {
  return function(password) {
    return bcrypt.compareSync(password, this.password);
  };
});

userSchema.plugin(mongooseLeanVirtuals);

module.exports = mongoose.model("User", userSchema);
