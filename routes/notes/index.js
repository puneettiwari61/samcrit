var express = require("express");
var router = express.Router();
var notesController = require("../../controllers/notesController");

var middleware = require("../../modules/middlewares");

// signup route
router.post("/", notesController.addNote);

/* login User. */
router.get("/:uniqueUrl", notesController.getNote);

module.exports = router;
