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
  } catch (err) {
    return false;
  }
};

/**
 * validate the time for a specific format
 * @param {*} sleepTime
 * @returns
 */
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

  return apiInstance
    .sendTransacEmail(sendSmtpEmail)
    .then(() => {
      return "SUCCESS";
    })
    .catch((err) => {
      throw new SleepTrackerError(
        "error sending mail to user",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
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
 * utility to send verification email to respective user
 * @param {*} userData
 * @returns
 */
exports.sendVerifyMail = async (userData) => {
  try {
    const emailOptions = {
      subject: "Verify your email",
      message: await generateVerifyLink(userData),
      receiver: userData.email,
    };

    return sendMail(emailOptions);
  } catch (err) {
    throw err;
  }
};

/**
 * helper method to generate verify email link for the user
 * @param {} userData
 * @returns
 */
const generateVerifyLink = async (userData) => {
  try {
    const token = await generateToken({
      userId: userData._id.toString(),
    });
    return (
      "<p> Please verify your email id using this link:" +
      "http://localhost:3000/user/verifyAccount/" +
      token +
      "</p>"
    );
  } catch (err) {
    throw err;
  }
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
