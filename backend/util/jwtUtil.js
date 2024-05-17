const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET, (err, decodedData) => {
    if (err) {
      throw Error(err);
    }

    return decodedData;
  });
};
