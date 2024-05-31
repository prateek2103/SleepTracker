/**
 * common error handling for the service
 */
const SleepTrackerError = require("../errorHandling/SleepTrackerError");

/**
 * not found route
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getNotFound = (req, res, next) => {
  res.status(404).send("invalid request");
};

/**
 * common error handler
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.getServerError = (err, req, res, next) => {
  if (err instanceof SleepTrackerError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.log(err);
  return res.status(500).send("Server error. Contact Administrator");
};
