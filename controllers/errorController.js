exports.getNotFound = (req, res, next) => {
  res.status(404).send("invalid request");
};

exports.getServerError = (err, req, res, next) => {
  res.status(500).send("Something went wrong" + err);
};
