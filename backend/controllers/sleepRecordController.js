const { validationResult } = require("express-validator");
const moment = require("moment-timezone");
const SleepRecordModel = require("../models/SleepRecordModel");
const { escape } = require("lodash");
const SleepTrackerError = require("../errorHandling/SleepTrackerError");
const { StatusCodes } = require("http-status-codes");
const TIMEZONE = "Asia/Kolkata";

exports.postSleepRecord = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new Error());
  }

  const sleepTime = moment.tz(req.body.sleepTime, TIMEZONE).utc();
  const wakeTime = moment.tz(req.body.wakeUpTime, TIMEZONE).utc();

  console.log(sleepTime.format());
  console.log(wakeTime.format());

  checkSleepEntryOverlap(sleepTime, wakeTime, req.userId)
    .then((isOverlapping) => {
      if (isOverlapping) {
        throw new SleepTrackerError(
          "your sleep entry is overlapping with another entry",
          StatusCodes.BAD_REQUEST
        );
      }

      const sleepData = SleepRecordModel({
        userId: req.userId,
        bedTime: sleepTime,
        wakeUpTime: wakeTime,
        place: req.body.place,
        day: moment(new Date()).utc(),
      });

      return sleepData.save();
    })
    .then((result) => {
      res.status(200).send("sleep entry saved successfully");
    })
    .catch((err) => {
      return next(err);
    });
};

exports.deleteSleepRecord = (req, res, next) => {
  const sleepRecordId = req.params.id;
  SleepRecordModel.deleteOne({
    userId: req.userId,
    id: sleepRecordId,
  })
    .then((result) => {
      if (result["deletedCount"] == 0) {
        throw new SleepTrackerError(
          "No sleep entry found to delete",
          StatusCodes.BAD_REQUEST
        );
      }
      res.status(200).send("sleep entry deleted successfully");
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateSleepRecord = (req, res, next) => {
  const sleepTime = moment.tz(req.body.sleepTime, TIMEZONE).utc();
  const wakeTime = moment.tz(req.body.wakeUpTime, TIMEZONE).utc();

  let foundSleepEntry;

  SleepRecordModel.findById(req.params.id)
    .then((sleepEntry) => {
      if (!sleepEntry) {
        throw new SleepTrackerError(
          "no sleep entry found to update",
          StatusCodes.NOT_FOUND
        );
      }

      foundSleepEntry = sleepEntry;
      return checkSleepEntryOverlap(
        sleepTime,
        wakeTime,
        req.userId,
        req.params.id
      );
    })
    .then((isOverlapping) => {
      if (isOverlapping) {
        throw new SleepTrackerError(
          "updated values are overlapping with the existing sleep entries",
          StatusCodes.BAD_REQUEST
        );
      }

      foundSleepEntry["bedTime"] = sleepTime;
      foundSleepEntry["wakeUpTime"] = wakeTime;

      return foundSleepEntry.save();
    })
    .then((result) => {
      res.status(200).send("sleep entry updated successfully");
    })
    .catch((err) => {
      next(err);
    });
};

const checkSleepEntryOverlap = (sleepTime, wakeTime, userId, sleepId) => {
  // get all sleep records for that user
  const query = {
    bedTime: {
      $lt: wakeTime,
    },
    wakeUpTime: {
      $gt: sleepTime,
    },
    userId: userId,
  };

  if (sleepId) {
    query["_id"] = { $ne: sleepId };
  }

  return SleepRecordModel.find(query)
    .then((data) => {
      return !data.length == 0;
    })
    .catch((err) => {
      throw err;
    });
};
