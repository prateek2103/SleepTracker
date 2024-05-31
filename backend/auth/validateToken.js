/**
 * middleware to validate token of protected routes
 */
const { StatusCodes } = require("http-status-codes");
const SleepTrackerError = require("../errorHandling/SleepTrackerError");
const jwtUtil = require("../util/jwtUtil");

/**
 * function to validate the auth token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.validateToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    if (token) {
      const { userId } = await jwtUtil.verifyToken(token.substr(7));
      req.userId = userId;
      next();
    } else {
      next(
        new SleepTrackerError("Authentication failed", StatusCodes.FORBIDDEN)
      );
    }
  } catch (err) {
    next(err);
  }
};
