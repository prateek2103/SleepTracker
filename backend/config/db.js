const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = () => {
  mongoose.connect(process.env.DB_URI);

  const db = mongoose.connection;

  db.on("connected", () => {
    console.log("database connection successful.");
  });

  db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  return db;
};

module.exports = connectToDB;
