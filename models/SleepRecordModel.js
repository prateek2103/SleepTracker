const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SleepRecordSchema = Schema({
  bedTime: {
    type: Date,
    required: true,
  },
  wakeUpTime: {
    type: Date,
    required: true,
  },
  place: {
    type: String,
  },
  day: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const SleepRecordModel = mongoose.model("Sleep", SleepRecordSchema);
module.exports = SleepRecordModel;
