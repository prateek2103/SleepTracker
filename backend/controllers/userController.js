const UserModel = require("../models/UserModel");
const { validationResult } = require("express-validator");
const jwtUtil = require("../util/jwtUtil");
const { sendVerifyMail, sendResetMail } = require("../util/commonUtil");
const SleepTrackerError = require("../errorHandling/SleepTrackerError");
const { StatusCodes } = require("http-status-codes");

/**
 * method to store user information on signup
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.postSignup = (req, res, next) => {
  const err = validationResult(req);

  // get validation errors if present
  if (!err.isEmpty()) {
    const errMsgs = err.errors.map((r) => r.msg);
    return next(
      new SleepTrackerError(JSON.stringify(errMsgs), StatusCodes.BAD_REQUEST)
    );
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

  // save user and send verify mail
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
        const errMsg =
          "user already exists with that registered " +
          JSON.stringify(err?.errorResponse?.keyValue);

        return next(new SleepTrackerError(errMsg, StatusCodes.BAD_REQUEST));
      }
      return next(
        new SleepTrackerError(
          "error while signing up user. Please try again later",
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      );
    });
};

/**
 * method to validate user and generate auth token on successful verification
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.postLogin = (req, res, next) => {
  let foundUser;

  // check if user exists
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        throw new SleepTrackerError(
          "Username or password is incorrect",
          StatusCodes.FORBIDDEN
        );
      }

      foundUser = user;

      // validate user passsword
      return user.comparePassword(req.body.password);
    })
    .then((isMatched) => {
      if (isMatched) {
        // check if user has been verified or not
        if (!foundUser.verified) {
          throw new SleepTrackerError(
            "A mail has been sent to your respective email id. Please verify",
            StatusCodes.FORBIDDEN
          );
        }

        // generate auth token
        return jwtUtil.generateToken({
          userId: foundUser._id.toString(),
          name: foundUser.firstName,
        });
      } else {
        throw new SleepTrackerError(
          "Username or password is incorrect",
          StatusCodes.FORBIDDEN
        );
      }
    })
    .then((token) => {
      res.status(200).json({ authToken: token });
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * method to verify user account using link send via email
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.getVerifyEmail = (req, res, next) => {
  const verifyToken = req.params.verifyId;

  if (!verifyToken) {
    return next(
      new SleepTrackerError(
        "invalid verify email link",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  // extract details from the verifyToken
  let userId;
  try {
    userId = jwtUtil.verifyToken(verifyToken).userId;
  } catch (err) {
    return next(err);
  }

  // check if user exists
  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        throw new SleepTrackerError(
          "invalid verify link",
          StatusCodes.BAD_REQUEST
        );
      }

      if (user.verified) {
        throw new SleepTrackerError(
          "User already verified",
          StatusCodes.BAD_REQUEST
        );
      }

      user.verified = true;
      return user.save();
    })
    .then(() => {
      return res.status(200).send("email verified successfully");
    })
    .catch((err) => {
      return next(err);
    });
};

/**
 * method to send reset password link to user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.postSendResetMail = (req, res, next) => {
  let foundUser;

  // check if user exists
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        throw new SleepTrackerError(
          "no user found with this email",
          StatusCodes.BAD_REQUEST
        );
      }

      // generate reset token for the user
      user.resetToken = jwtUtil.generateToken({ userId: user._id });

      foundUser = user;
      return user.save();
    })
    .then(() => {
      return sendResetMail(foundUser);
    })
    .then(() => {
      return res.status(200).send("reset mail sent successfully");
    })
    .catch((err) => {
      return next(err);
    });
};

/**
 * method to reset password once reset token is verified
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.postResetPassword = (req, res, next) => {
  const resetToken = req.body.resetToken;

  // decode reset token
  const { userId } = jwtUtil.verifyToken(resetToken);

  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        throw new SleepTrackerError(
          "invalid reset password link",
          StatusCodes.BAD_REQUEST
        );
      }

      if (user.resetToken !== resetToken) {
        throw new SleepTrackerError(
          "invalid reset password link",
          StatusCodes.FORBIDDEN
        );
      }

      // update password and set reset token to null
      user.password = req.body.password;
      user.resetToken = null;

      return user.save();
    })
    .then(() => {
      return res.status(200).send("user password resetted successfully");
    })
    .catch((err) => {
      return next(err);
    });
};
