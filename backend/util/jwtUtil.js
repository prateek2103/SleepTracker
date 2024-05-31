/**
 * JWT utility class
 */
const jwt = require("jsonwebtoken");
const SleepTrackerError = require("../errorHandling/SleepTrackerError");
const { StatusCodes } = require("http-status-codes");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * method to generate jwt token for the payload
 * @param {} payload
 * @returns
 */
exports.generateToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        reject(
          new SleepTrackerError(
            "Error while generating JWT token",
            StatusCodes.INTERNAL_SERVER_ERROR
          )
        );
      }

      resolve(token);
    });
  });
};

/**
 * method to verify jwt token
 * @param {} token
 * @returns
 */
exports.verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decodedData) => {
      if (err) {
        reject(
          new SleepTrackerError(
            "Authentication failed. Invalid user token",
            StatusCodes.FORBIDDEN
          )
        );
      }

      resolve(decodedData);
    });
  });
};
