const connectToDB = require("./config/db");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const userRoutes = require("./routes/userRoutes");
const UserModel = require("./models/UserModel");
const SleepRecordModel = require("./models/SleepRecordModel");
const db = connectToDB();
const errorController = require("./controllers/errorController");
const bodyParser = require("body-parser");
const { loadCountries } = require("./config/loadCountryConfig");
app.use(bodyParser.json());

// routes
app.use("/user", userRoutes);

// middleware to handle not found routes
app.use("*", errorController.getNotFound);

// middleware to handle errors
app.use(errorController.getServerError);

//starting the server
app.listen(PORT, () => {
  console.log(`application is up on ${PORT}`);

  loadCountries();
  // user = new UserModel({
  //   firstName: "prateek",
  //   age: 10,
  //   country: "India",
  //   state: "Delhi",
  //   email: "ppratee180@gmail.com",
  //   phoneNumber: "9971930070",
  //   password: "prateek@2103",
  // });

  // user
  //   .save()
  //   .then((userData) => {
  //     console.log("user saved successfully");
  //     sleepRecord = new SleepRecordModel({
  //       bedTime: new Date(),
  //       wakeUpTime: new Date(),
  //       day: new Date(),
  //       userId: userData,
  //     });

  //     return sleepRecord.save();
  //   })
  //   .then(() => {
  //     console.log("sleep data saved successfully");
  //   });
});
