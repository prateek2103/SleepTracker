const UserModel = require("../models/UserModel");
const { validationResult } = require("express-validator");
const jwtUtil = require("../util/jwtUtil");
const { sendVerifyMail, sendResetMail } = require("../util/commonUtil");
/**
 * method to store user information on signup
 * @param {*} req
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
    verified: false,
  });

  userData
    .save()
    .then(() => {
      return sendVerifyMail(userData);
    })
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
  let foundUser;

  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(403).send("Username or password is incorrect");
      }

      foundUser = user;
      return user.comparePassword(req.body.password);
    })
    .then((result) => {
      console.log(result);
      if (result) {
        if (!foundUser.verified) {
          return res
            .status(403)
            .send(
              "A mail has been sent to your respective email id. Please verify"
            );
        }
        return jwtUtil.generateToken({
          userId: foundUser._id.toString(),
          name: foundUser.firstName,
        });
      } else {
        res.status(403).send("Username or password is incorrect");
      }
    })
    .then((token) => {
      console.log(token);
      res.status(200).json({ token: token });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getVerifyEmail = (req, res, next) => {
  const verifyRequestId = req.params.verifyId;
  console.log(req.params);
  if (!verifyRequestId) {
    return res.status(400).send("invalid verify email link");
  }

  const { userId } = jwtUtil.verifyToken(verifyRequestId);

  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        throw Error("invalid verify link");
      }
      user.verified = true;
      return user.save();
    })
    .then(() => {
      res.status(200).send("email verified successfully");
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send("invalid verify email link");
    });
};

exports.postSendResetMail = (req, res, next) => {
  const email = req.body.email;
  let foundUser;

  UserModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        throw Error("no user found with this email");
      }

      user.resetToken = jwtUtil.generateToken({ userId: user._id });
      foundUser = user;
      return user.save();
    })
    .then(() => {
      return sendResetMail(foundUser);
    })
    .then(() => {
      res.status(200).send("reset mail sent successfully");
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
};

exports.postResetPassword = (req, res, next) => {
  // decode reset token
  const resetToken = req.body.resetToken;

  const { userId } = jwtUtil.verifyToken(resetToken);

  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        throw Error("invalid reset password link");
      }

      if (user.resetToken !== resetToken) {
        throw Error("invalid reset password link");
      }

      user.password = req.body.password;
      user.resetToken = null;

      return user.save();
    })
    .then(() => {
      res.status(200).send("user password resetted successfully");
    });
};
