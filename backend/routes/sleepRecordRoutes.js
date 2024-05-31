/**
 * routes for sleep related data entries
 */
const router = require("express").Router();
const sleepRecordController = require("../controllers/sleepRecordController");
const { validateToken } = require("../middleware/validateToken");
const {
  sleepEntryValidations,
  sleepEntryDeleteValidations,
} = require("../validations/sleepRecordValidations");
const { handleValidationErrors } = require("../middleware/validationHandler");

// POST /index/sleepEntry
router.post(
  "/sleepEntry",
  validateToken,
  sleepEntryValidations,
  handleValidationErrors,
  sleepRecordController.postSleepRecord
);

// DELETE /index/sleepEntry/id
router.delete(
  "/sleepEntry/:id",
  validateToken,
  sleepEntryDeleteValidations,
  handleValidationErrors,
  sleepRecordController.deleteSleepRecord
);

// PUT /index/sleepEntry/id
router.put(
  "/sleepEntry/:id",
  validateToken,
  sleepEntryValidations,
  handleValidationErrors,
  sleepRecordController.updateSleepRecord
);

module.exports = router;
