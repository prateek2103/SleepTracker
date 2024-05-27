const _ = require("lodash");
const { getCountryCode } = require("../config/loadCountryConfig");
const { parsePhoneNumberFromString } = require("libphonenumber-js");
const { generateToken } = require("./jwtUtil");
const SibApiV3Sdk = require("@getbrevo/brevo");
const SleepTrackerError = require("../errorHandling/SleepTrackerError");
const { StatusCodes } = require("http-status-codes");
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_API_KEY;
const moment = require("moment");
const TIME_FORMAT_12 = "HH:mm A";
const TIME_FORMAT_24 = "HH:mm";

const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_NAME = process.env.SENDER_NAME;

/**
 * function to validate the country name
 * either country should be empty or valid
 * @param {*} countryName
 * @returns
 */
exports.countryValidator = (countryName) => {
  return _.isEmpty(countryName) || !_.isEmpty(getCountryCode(countryName));
};

/**
 * function to validate phone number based on country code
 * @param {*} phoneNumber
 * @param {*} countryCode
 * @returns
 */
exports.phoneNumberValidator = (phoneNumber, countryCode) => {
  try {
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, countryCode);
    return phoneNumberObj && phoneNumberObj.isValid();
  } catch (error) {
    return false;
  }
};

exports.sleepTimeValidator = (sleepTime) => {
  try {
    let date = moment(sleepTime, "YYYY-MM-DDTHH:mm:ss", true);
    return date.isValid();
  } catch (err) {
    return false;
  }
};
/**
 * method to send mail to users using Brevo sdk
 * @param {} emailOptions
 * @returns
 */
const sendMail = (emailOptions) => {
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  // basic information
  sendSmtpEmail.subject = emailOptions.subject;
  sendSmtpEmail.htmlContent = emailOptions.message;
  sendSmtpEmail.sender = {
    name: SENDER_NAME,
    email: SENDER_EMAIL,
  };
  sendSmtpEmail.to = [{ email: emailOptions.receiver }];

  return apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(console.log("email sent successfully"));
    },
    function (error) {
      throw new SleepTrackerError(
        "error sending mail to user",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  );
};

/**
 * method to send reset email to user
 * @param {*} userData
 * @returns
 */
exports.sendResetMail = (userData) => {
  const emailOptions = {
    subject: "Reset password link for your email",
    message: generateResetLink(userData),
    receiver: userData.email,
  };

  return sendMail(emailOptions);
};

/**
 * util to send verify email to signed up user
 * @param {*} userData
 * @returns
 */
exports.sendVerifyMail = (userData) => {
  const emailOptions = {
    subject: "Verify your email",
    message: generateVerifyLink(userData),
    receiver: userData.email,
  };

  return sendMail(emailOptions);
};

/**
 * helper method to generate verify email link for the user
 * @param {} userData
 * @returns
 */
const generateVerifyLink = (userData) => {
  const token = generateToken({
    userId: userData._id.toString(),
  });
  return (
    "<p> Please verify your email id using this link:" +
    "http://localhost:3000/verifyAccount/" +
    token +
    "</p>"
  );
};

/**
 * helper method to generate reset link
 * @param {*} userData
 * @returns
 */
const generateResetLink = (userData) => {
  return (
    "<p> Forgot your password? Don't worry we got you covered. Click on this link:" +
    "http://localhost:3000/resetPassword/" +
    userData.resetToken +
    " </p>"
  );
};
