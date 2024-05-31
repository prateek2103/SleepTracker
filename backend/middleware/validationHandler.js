/**
 * middleware to handle validation errors
 */
const { validationResult } = require("express-validator");
const SleepTrackerError = require("../errorHandling/SleepTrackerError");
const { StatusCodes } = require("http-status-codes");

module.exports = handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errMsgs = validationErrors.errors.map((r) => r.msg);
    next(
      new SleepTrackerError(JSON.stringify(errMsgs), StatusCodes.BAD_REQUEST)
    );
  }

  next();
};
