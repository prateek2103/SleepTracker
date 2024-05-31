/**
 * sleep routes pre data validations
 */
const { body } = require("express-validator");
const { sleepTimeValidator } = require("../util/commonUtil");

/**
 * validate bed time with custom validator
 */
const validateBedTime = body("sleepTime")
  .custom(sleepTimeValidator)
  .withMessage("enter a valid bed time");

/**
 * validate wakeUpTime with custom validator
 */
const validateWakeUpTime = body("wakeUpTime")
  .custom(sleepTimeValidator)
  .withMessage("enter a valid wakeUp time");

/**
 * validate sleep entry id
 */
const validateSleepEntryId = body("id")
  .isEmpty()
  .withMessage("please specify the sleep entry to be deleted");

exports.sleepEntryValidations = [validateBedTime, validateWakeUpTime];
exports.sleepEntryDeleteValidations = [validateSleepEntryId];
