var Note = require("../models/notes");

const { check, validationResult } = require("express-validator");

module.exports = {
  addNote: async (req, res) => {
    try {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(422).json({ errors: errors.array() });
      // }
      // console.log(req, "from addnote");
      req.body.author = "puneet";
      req.body.uniqueUrl = Math.random()
        .toString(36)
        .split(".")[1];
      var note = await Note.create(req.body);

      res.json({
        success: true,
        note
      });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  getNote: async (req, res) => {
    try {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(422).json({ errors: errors.array() });
      // }
      // console.log(req, "from getnote");

      var note = await Note.findOne({ uniqueUrl: req.params.uniqueUrl });
      if (note) {
        res.json({
          success: true,
          note
        });
      }
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  }
};
