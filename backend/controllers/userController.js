const { response } = require("express");
const UserModel = require("../models/UserModel");
const { validationResult } = require("express-validator");

/**
 * method to store user information on signup
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);

  // get validation errors if present
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new Error(errors.toString());
  }

  // create user model before saving
  userData = new UserModel({
    firstName: req.body.firstName,
    age: req.body.age,
    country: req.body.country,
    state: req.body.state,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  });

  userData
    .save()
    .then(() => {
      return res.status(201).send("user added successfully");
    })
    .catch((err) => {
      // dup check on email and phone number
      if (err?.errorResponse?.code === 11000) {
        res
          .status(403)
          .send(
            "user already exists with that registered " +
              JSON.stringify(err?.errorResponse?.keyValue)
          );
      }
    });
};

exports.postLogin = (req, res, next) => {
  // check if user exists

  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        c;
        return res.status(403).send("Username or password is incorrect");
      }

      console.log(user);
      return user.comparePassword(req.body.password);
    })
    .then((result) => {
      console.log(result);
      if (result) {
        res.status(200).send("login successful");
      } else {
        res.status(403).send("Username or password is incorrect");
      }
    })
    .catch((err) => {
      throw new Error("server error please try again later.");
    });
};
