/**
 * database connection configuration
 */
const mongoose = require("mongoose");
require("dotenv").config();

/**
 * initial connection
 * avoid creating automatic index
 * hearbeat frequency: 15 seconds (disconnected event will show error according to this value)
 * socketTimeout: kill a socket after 60 seconds of inactivity
 * serverSelectionTimeout: how long to wait to execute an operation before throwing connection error
 */
mongoose
  .connect(process.env.DB_URI, {
    autoIndex: false,
    dbName: process.env.DB_NAME,
    maxPoolSize: Number(process.env.MAX_POOL_SIZE),
    minPoolSize: Number(process.env.MIN_POOL_SIZE),
    heartbeatFrequencyMS: Number(process.env.HEART_BEAT_FREQ),
    socketTimeoutMS: Number(process.env.SOCKET_TIMEOUT_MS),
    serverSelectionTimeoutMS: Number(process.env.SERVER_SELECTION_TIMEOUT_MS),
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    throw err;
  });

/**
 * once the connection is established
 */
mongoose.connection.on("error", (err) => {
  console.log("err");
});

/**
 * in between database connectivity loss
 */
mongoose.connection.on("disconnected", () => {
  console.log("disconnected from database");
});

mongoose.connection.on("reconnected", () =>
  console.log("reconnected to database")
);

module.exports = mongoose;
