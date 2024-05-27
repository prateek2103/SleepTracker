const { StatusCodes } = require("http-status-codes");
const SleepTrackerError = require("../errorHandling/SleepTrackerError");
const jwtUtil = require("../util/jwtUtil");
exports.validateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    const { userId } = jwtUtil.verifyToken(token.substr(7));
    console.log(token);
    req.userId = userId;

    next();
  } else {
    next(new SleepTrackerError("auth token required", StatusCodes.FORBIDDEN));
  }
};
