const _ = require("lodash");
const { getCountryCode } = require("../config/loadCountryConfig");
const { parsePhoneNumberFromString } = require("libphonenumber-js");
const { generateToken } = require("./jwtUtil");
const SibApiV3Sdk = require("@getbrevo/brevo");
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_API_KEY;

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

const sendMail = (emailOptions) => {
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

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
      console.error(error);
    }
  );
};

exports.sendResetMail = (userData) => {
  const emailOptions = {
    subject: "Reset password link for your email",
    message:
      "<p> Forgot your password? Don't worry we got you covered. Click on this link:" +
      generateResetLink(userData),
    receiver: userData.email,
  };

  return sendMail(emailOptions);
};

exports.sendVerifyMail = (userData) => {
  const emailOptions = {
    subject: "Verify your email",
    message:
      "<p> Please verify your email id using this link:" +
      generateVerifyLink(userData),
    receiver: userData.email,
  };

  return sendMail(emailOptions);
};

const generateVerifyLink = (userData) => {
  const token = generateToken({
    userId: userData._id,
  });
  return "http://localhost:3000/verifyAccount/" + token;
};

const generateResetLink = (userData) => {
  return "http://localhost:3000/resetPassword/" + userData.resetToken;
};
