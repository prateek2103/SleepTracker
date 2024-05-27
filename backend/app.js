const connectToDB = require("./config/db");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const userRoutes = require("./routes/userRoutes");
const errorController = require("./controllers/errorController");
const bodyParser = require("body-parser");
const { loadCountries } = require("./config/loadCountryConfig");
const sleepRecordRoutes = require("./routes/sleepRecordRoutes");

app.use(bodyParser.json());

// routes
app.use("/user", userRoutes);
app.use("/index", sleepRecordRoutes);

// middleware to handle not found routes
app.use("*", errorController.getNotFound);

// middleware to handle errors
app.use(errorController.getServerError);

//starting the server
app.listen(PORT, () => {
  console.log(`application is up on ${PORT}`);

  connectToDB();

  // load country codes at startup
  loadCountries();
});
