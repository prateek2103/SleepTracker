const { validationResult } = require("express-validator");
const moment = require("moment-timezone");
const SleepRecordModel = require("../models/SleepRecordModel");
const { escape } = require("lodash");
const SleepTrackerError = require("../errorHandling/SleepTrackerError");
const { StatusCodes } = require("http-status-codes");
const TIMEZONE = "Asia/Kolkata";

/**
 * store a sleep entry for the user
 * a sleep entry should not overlap with another one
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.postSleepRecord = (req, res, next) => {
  // conver to utc before comparison
  const sleepTime = moment.tz(req.body.sleepTime, TIMEZONE).utc();
  const wakeTime = moment.tz(req.body.wakeUpTime, TIMEZONE).utc();

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

/**
 * method to delete a sleep entry based on id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
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

/**
 * method to update sleep data for a record
 * by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
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

      if (sleepEntry.userId != req.userId) {
        throw new SleepTrackerError(
          "sleep entry does not belong to the user",
          StatusCodes.FORBIDDEN
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

/**
 * helper method to check if sleep time and waketime for an entry is overlapping with another
 * @param {*} sleepTime
 * @param {*} wakeTime
 * @param {*} userId
 * @param {*} sleepId
 * @returns
 */
const checkSleepEntryOverlap = (sleepTime, wakeTime, userId, sleepId) => {
  const query = {
    bedTime: {
      $lt: wakeTime,
    },
    wakeUpTime: {
      $gt: sleepTime,
    },
    userId: userId,
  };

  // don't include the sleep id to be updated in comparison
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
