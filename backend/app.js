const express = require("express");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const sleepRecordRoutes = require("./routes/sleepRecordRoutes");
const errorController = require("./controllers/errorController");
const bodyParser = require("body-parser");
const { loadCountries } = require("./config/loadCountryConfig");

/**
 * connecting to database
 */
const _ = require("./config/db");

/**
 * helper middlewares
 * bodyParser.json - to parse JSON request body
 */
app.use(bodyParser.json());

/**
 * routes
 * /user - user related routes : login, signup
 * /index - sleep entry related routes
 * '*' - to handle any other kind of routes
 * errorController for centralized error handling
 */
app.use("/user", userRoutes);
app.use("/index", sleepRecordRoutes);
app.use("*", errorController.getNotFound);
app.use(errorController.getServerError);

/**
 * turning app.listen as a promise
 * easy to catch errors and understandable code
 * @param {*} port
 * @returns
 */
const startServer = (port) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
    });
    server.on("error", (err) => {
      reject(err);
    });
  });
};

/**
 * starting the server
 * loading the country codes at startup
 */
startServer(process.env.PORT)
  .then(() => {
    loadCountries();
    console.log(`application is up on ${process.env.PORT}`);
  })
  .catch((err) => {
    console.log("Error starting the service: " + err);
  });
