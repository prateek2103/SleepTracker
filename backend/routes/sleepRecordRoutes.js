const router = require("express").Router();
const sleepRecordController = require("../controllers/sleepRecordController");
const { validateToken } = require("../auth/validateToken");
const {
  sleepEntryValidations,
  sleepEntryDeleteValidations,
} = require("../validations/sleepRecordValidations");

// POST /sleepEntry
router.post(
  "/sleepEntry",
  validateToken,
  sleepEntryValidations,
  sleepRecordController.postSleepRecord
);

// DELETE /sleepEntry/id
router.delete(
  "/sleepEntry/:id",
  validateToken,
  sleepEntryDeleteValidations,
  sleepRecordController.deleteSleepRecord
);

// PUT /sleepEntry/id
router.put(
  "/sleepEntry/:id",
  validateToken,
  sleepEntryValidations,
  sleepRecordController.updateSleepRecord
);

module.exports = router;
