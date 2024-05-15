const UserModel = require("../models/UserModel");
const { validationResult } = require("express-validator");

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
  }

  userData = new UserModel({
    firstName: req.firstName,
    age: req.age,
    country: req.country,
    state: req.state,
    email: req.email,
    phoneNumber: req.phoneNumber,
    password: req.password,
  });

  res.send("signup successful");
};
