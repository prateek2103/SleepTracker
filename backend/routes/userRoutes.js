/**
 * user data related routes
 * login, signup, verifyEmail, resetPassword
 */
const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  signupValidations,
  loginValidations,
  resetGetValidations,
  resetPostValidations,
} = require("../validations/userValidations");
const { handleValidationErrors } = require("../middleware/validationHandler");

/**
 * POST /user/signup
 */
router.post(
  "/signup",
  signupValidations,
  handleValidationErrors,
  userController.postSignup
);

/**
 * POST /user/login
 */
router.post(
  "/login",
  loginValidations,
  handleValidationErrors,
  userController.postLogin
);

/**
 * GET /user/verifyAccount/verifyId
 */
router.get(
  "/verifyAccount/:verifyToken",
  handleValidationErrors,
  userController.getVerifyEmail
);
module.exports = router;

/**
 * POST /user/resetPassword
 */
router.post(
  "/resetPassword",
  resetPostValidations,
  handleValidationErrors,
  userController.postResetPassword
);

/**
 * POST /user/sendResetMail
 */
router.post(
  "/sendResetMail",
  resetGetValidations,
  handleValidationErrors,
  userController.postSendResetMail
);
