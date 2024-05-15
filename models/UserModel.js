/**
 * User model for storing user related information in database
 */
const mongoose = require("mongoose");
const { getCountryCode } = require("../config/loadCountryConfig");
const bcryptjs = require("bcryptjs");

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
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
