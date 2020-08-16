const { check, validationResult } = require("express-validator");

exports.validateUsersSignup = () => {
  return [
    check("email")
      .notEmpty()
      .isEmail(),
    check("password").isLength({ min: 6 }),
    check("name").notEmpty()
    // check("lastName").notEmpty(),
    // check("contactNumber").notEmpty(),
    // check("gender").notEmpty(),
    // check("dob").notEmpty(),
  ];
};

exports.validateLogin = () => {
  return [check("email").notEmpty(), check("password").isLength({ min: 6 })];
};

exports.validateEvent = () => {
  return [
    check("eventName").notEmpty(),
    check("eventType").notEmpty(),
    check("date").notEmpty(),
    check("address").notEmpty(),
    check("time").notEmpty()
  ];
};
