/**
 * user data related validations
 */
const { body } = require("express-validator");
const {
  countryValidator,
  phoneNumberValidator,
} = require("../util/commonUtil");

const { getCountryCode } = require("../config/loadCountryConfig");
/**
 * firstname should be between 1 to 30 characters
 * only alphabets
 */
const validateFirstName = body("firstName")
  .isLength({ min: 1, max: 30 })
  .withMessage(
    "Firstname cannot be empty and should be less than 30 characters"
  )
  .matches(/^[a-zA-Z]*$/)
  .withMessage("Firstname can only contain alphabets")
  .trim();

/**
 * lastname can be empty but less than 30 characters
 * only alphabets
 */
const validateLastName = body("firstName")
  .isLength({ min: 0, max: 30 })
  .withMessage("Lastname cannot be more than 30 characters")
  .matches(/^[a-zA-Z]*$/)
  .withMessage("Lastname can only contain alphabets")
  .trim();

/**
 * email validation
 */
const validateEmail = body("email")
  .isEmail()
  .withMessage("Email must be valid")
  .toLowerCase();

/**
 * age should be in range 13 to 100
 */
const validateAge = body("age")
  .isInt({ min: 13 })
  .withMessage("Too young to track your sleep")
  .isInt({ max: 100 })
  .withMessage("Either you are immortal or you are lying to us.");

/**
 * custom country name validator
 */
const validateCountry = body("country")
  .custom(countryValidator)
  .withMessage("Invalid country")
  .trim();

/**
 * custom phone number validator based on country code
 */
const validatePhoneNumber = body("phoneNumber")
  .custom((value, { req }) =>
    phoneNumberValidator(value, getCountryCode(req.country))
  )
  .withMessage("Invalid phone number");

/**
 * password should be minimum 8 characters
 */
const validatePassword = body("password")
  .isLength({ min: 8 })
  .withMessage("Password must be atleast 8 characters long")
  .trim();

/**
 * confirm password and password should match
 */
const validateConfirmPassword = body("confirmPassword")
  .custom((value, { req }) => value === req.body.password)
  .withMessage("passsword and confirmPassword do not match");

/**
 * signup validation
 */
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

/**
 * login validations
 */
exports.loginValidations = [
  validateEmail,
  body("password").isEmpty().withMessage("password cannot be empty"),
];

/**
 * reset password validations
 */
exports.resetPostValidations = [
  validatePassword,
  validateConfirmPassword,
  body("resetToken").isEmpty().withMessage("reset token is empty"),
];

exports.resetGetValidations = [validateEmail];
