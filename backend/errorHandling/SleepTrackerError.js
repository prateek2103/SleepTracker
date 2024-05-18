/**
 * custom error handling class
 */
class SleepTrackerError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Maintaining proper stack trace (only available on V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = SleepTrackerError;
