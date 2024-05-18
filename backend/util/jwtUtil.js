const jwt = require("jsonwebtoken");
const SleepTrackerError = require("../errorHandling/SleepTrackerError");
const { StatusCodes } = require("http-status-codes");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * method to generate jwt token for the payload
 * @param {} payload
 * @returns
 */
exports.generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

/**
 * method to verify jwt token
 * @param {} token
 * @returns
 */
exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET, (err, decodedData) => {
    if (err) {
      throw new SleepTrackerError("invalid user token", StatusCodes.FORBIDDEN);
    }

    return decodedData;
  });
};
