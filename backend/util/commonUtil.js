const _ = require("lodash");
const { getCountryCode } = require("../config/loadCountryConfig");
const { parsePhoneNumberFromString } = require("libphonenumber-js");
const { generateToken } = require("./jwtUtil");
const SibApiV3Sdk = require("@getbrevo/brevo");
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_API_KEY;

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

exports.sendMail = (userData) => {
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "Verify your email";
  sendSmtpEmail.htmlContent =
    "<p> Please verify your email id using this link:" + generateLink(userData);
  sendSmtpEmail.sender = {
    name: "Prateek Purohit",
    email: "usernameprateek@gmail.com",
  };
  sendSmtpEmail.to = [{ email: userData.email, name: userData.firstName }];

  return apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(console.log("email sent successfully"));
    },
    function (error) {
      console.error(error);
    }
  );
};

const generateLink = (userData) => {
  const token = generateToken({
    userId: userData._id,
  });
  return "http://localhost:3000/verifyAccount/" + token;
};
