const _ = require("lodash");
const { getCountryCode } = require("../config/loadCountryConfig");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

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
