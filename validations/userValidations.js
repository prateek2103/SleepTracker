const { body } = require("express-validator");
const {
  countryValidator,
  phoneNumberValidator,
} = require("../util/sleepTrackerUtil");
const { getCountryCode } = require("../config/loadCountryConfig");

const validateFirstName = body("firstName")
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage(
    "Firstname cannot be empty and should be less than 30 characters"
  )
  .matches(/^[a-zA-Z]*$/)
  .withMessage("Firstname can only contain alphabets");

const validateLastName = body("firstName")
  .trim()
  .isLength({ min: 0, max: 30 })
  .withMessage("Lastname cannot be more than 30 characters")
  .matches(/^[a-zA-Z]*$/)
  .withMessage("Lastname can only contain alphabets");

const validateEmail = body("email")
  .isEmail()
  .withMessage("Email must be valid")
  .toLowerCase();

const validateAge = body("age")
  .isInt({ min: 13 })
  .withMessage("Too young to track your sleep")
  .isInt({ max: 100 })
  .withMessage("Either you are immortal or you are lying to us.");

const validateCountry = body("country")
  .trim()
  .custom(countryValidator)
  .withMessage("Invalid country");

const validatePhoneNumber = body("phoneNumber")
  .custom((value, { req }) =>
    phoneNumberValidator(value, getCountryCode(req.country))
  )
  .withMessage("Invalid phone number");

const validatePassword = body("password")
  .trim()
  .length({ min: 8 })
  .withMessage("Password must be atleast 8 characters long");

exports.signupValidations = [
  validateFirstName,
  validateLastName,
  validateEmail,
  validateAge,
  validateCountry,
  validatePhoneNumber,
  validatePassword,
];
