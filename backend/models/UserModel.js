/**
 * User model for storing user related information in database
 */
const mongoose = require("mongoose");
const { getCountryCode } = require("../config/loadCountryConfig");
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  profession: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

// encrypt user password before saving
UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
