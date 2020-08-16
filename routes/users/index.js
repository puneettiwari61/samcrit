var express = require("express");
var router = express.Router();
var usersController = require("../../controllers/userController");
var auth = require("../../modules/auth");
var middleware = require("../../modules/middlewares");

// signup route
router.post(
  "/register",
  middleware.validateUsersSignup(),
  usersController.signUp
);

/* login User. */
router.post("/login", middleware.validateLogin(), usersController.login);

// Details of current logged in user
router.get("/me", auth.verifyToken, usersController.getCurrentUser);

// add event
router.post(
  "/addevent",
  auth.verifyToken,
  middleware.validateEvent(),
  usersController.addEvent
);

//get all addevents
router.get("/events", usersController.getEvents);

module.exports = router;
