var User = require("../models/users");
var Event = require("../models/events");
var auth = require("../modules/auth");
const { check, validationResult } = require("express-validator");

module.exports = {
  signUp: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      var user = await User.create(req.body);
      console.log("hit", user, req.body);
      var token = await auth.generateJWT(user);
      let { name, email } = user;
      res.json({
        success: true,
        user: {
          name,
          email
        },
        token
      });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      var user = await User.findOne({ email: req.body.email }).lean({
        virtuals: true
      });
      if (!user)
        return res.json({ success: false, msg: "incorrect credentials" });
      if (!user.verifyPassword(req.body.password)) {
        return res.json({ success: false, msg: "incorrect password" });
      }
      var token = await auth.generateJWT(user);
      delete user["password"];
      res.json({ success: true, user, token });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  getCurrentUser: async (req, res) => {
    try {
      var user = await User.findById(req.user.userId).select("-password");
      res.json({ success: true, user });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },

  addEvent: async (req, res) => {
    try {
      req.body.organiser = req.user.name;
      var event = await Event.create(req.body);
      var user = await User.findByIdAndUpdate(req.user.userId, {
        $push: { events: event.id }
      });
      res.json({ success: true, event });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },

  getEvents: async (req, res) => {
    try {
      var events = await Event.find();
      res.json({ success: true, events });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  }
};
