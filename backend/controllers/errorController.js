const SleepTrackerError = require("../errorHandling/SleepTrackerError");

exports.getNotFound = (req, res, next) => {
  res.status(404).send("invalid request");
};

exports.getServerError = (err, req, res, next) => {
  if (err instanceof SleepTrackerError) {
    console.log(err.message);
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.log(err);
  return res.status(500).send("Server error. Contact Administrator");
};
