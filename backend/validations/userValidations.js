const { body } = require("express-validator");
const {
  countryValidator,
  phoneNumberValidator,
} = require("../util/commonUtil");
const { getCountryCode } = require("../config/loadCountryConfig");

const validateFirstName = body("firstName")
  .isLength({ min: 1, max: 30 })
  .withMessage(
    "Firstname cannot be empty and should be less than 30 characters"
  )
  .matches(/^[a-zA-Z]*$/)
  .withMessage("Firstname can only contain alphabets")
  .trim();

const validateLastName = body("firstName")
  .isLength({ min: 0, max: 30 })
  .withMessage("Lastname cannot be more than 30 characters")
  .matches(/^[a-zA-Z]*$/)
  .withMessage("Lastname can only contain alphabets")
  .trim();

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
  .custom(countryValidator)
  .withMessage("Invalid country")
  .trim();

const validatePhoneNumber = body("phoneNumber")
  .custom((value, { req }) =>
    phoneNumberValidator(value, getCountryCode(req.country))
  )
  .withMessage("Invalid phone number");

const validatePassword = body("password")
  .isLength({ min: 8 })
  .withMessage("Password must be atleast 8 characters long")
  .trim();

const validateConfirmPassword = body("confirmPassword")
  .custom((value, { req }) => value === req.body.password)
  .withMessage("passsword and confirmPassword do not match");

exports.signupValidations = [
  validateFirstName,
  validateLastName,
  validateEmail,
  validateAge,
  validateCountry,
  validatePhoneNumber,
  validatePassword,
  validateConfirmPassword,
];

exports.loginValidations = [
  validateEmail,
  body("password").isEmpty().withMessage("password cannot be empty"),
];
