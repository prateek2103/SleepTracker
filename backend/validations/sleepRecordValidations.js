const { body } = require("express-validator");
const { sleepTimeValidator } = require("../util/commonUtil");

const validateStartTime = body("sleepTime")
  .custom(sleepTimeValidator)
  .withMessage("enter a valid start time");

const validateEndTime = body("wakeUpTime")
  .custom(sleepTimeValidator)
  .withMessage("enter a valid end time");

const validateSleepEntryId = body("id")
  .isEmpty()
  .withMessage("please specify the sleep entry to be deleted");

exports.sleepEntryValidations = [validateStartTime, validateEndTime];
exports.sleepEntryDeleteValidations = [validateSleepEntryId];
