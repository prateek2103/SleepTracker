const UserModel = require("../models/UserModel");
const jwtUtil = require("../util/jwtUtil");
const { sendVerifyMail, sendResetMail } = require("../util/commonUtil");
const SleepTrackerError = require("../errorHandling/SleepTrackerError");
const { StatusCodes } = require("http-status-codes");

/**
 * method to store user information on signup
 * sent verification email to verify the account
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.postSignup = (req, res, next) => {
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
      console.log("verification email sent out successfully");
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

      return err instanceof SleepTrackerError
        ? next(err)
        : next(
            new SleepTrackerError(
              "error while signing up user. Please try again later",
              StatusCodes.INTERNAL_SERVER_ERROR
            )
          );
    });
};

/**
 * method to validate user
 * generate auth token on successful verification
 * login only verified users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.postLogin = (req, res, next) => {
  let foundUser;

  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        throw new SleepTrackerError(
          "Username or password is incorrect",
          StatusCodes.FORBIDDEN
        );
      }

      foundUser = user;

      return user.comparePassword(req.body.password);
    })
    .then((isMatched) => {
      if (isMatched) {
        if (!foundUser.verified) {
          throw new SleepTrackerError(
            "A mail has been sent to your respective email id. Please verify",
            StatusCodes.FORBIDDEN
          );
        }

        return jwtUtil.generateToken({
          userId: foundUser._id.toString(),
          name: foundUser.firstName,
        });
      }

      throw new SleepTrackerError(
        "Username or password is incorrect",
        StatusCodes.FORBIDDEN
      );
    })
    .then((token) => {
      res.status(200).json({ authToken: token });
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * method to verify user account using verification email link
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.getVerifyEmail = (req, res, next) => {
  const verifyToken = req.params.verifyToken;

  if (!verifyToken) {
    return next(
      new SleepTrackerError(
        "invalid verify email link",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  jwtUtil
    .verifyToken(verifyToken)
    .then((decodedData) => {
      return decodedData.userId;
    })
    .then((userId) => {
      return UserModel.findById(userId);
    })
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
 * generate a jwt token (reset token) for the user which will be stored in db as well
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

      return jwtUtil.generateToken({ userId: user._id });
    })
    .then((token) => {
      user.resetToken = token;
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

  const { userId } = jwtUtil.verifyToken(resetToken);

  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        throw new SleepTrackerError(
          "Invalid reset password link",
          StatusCodes.BAD_REQUEST
        );
      }

      if (user.resetToken !== resetToken) {
        throw new SleepTrackerError(
          "Invalid reset password link",
          StatusCodes.FORBIDDEN
        );
      }

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
