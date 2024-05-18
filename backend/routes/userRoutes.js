const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  signupValidations,
  loginValidations,
  resetGetValidations,
  resetPostValidations,
} = require("../validations/userValidations");

// POST /user/signup
router.post("/signup", signupValidations, userController.postSignup);

// POST /user/login
router.post("/login", loginValidations, userController.postLogin);

// GET /user/verifyEmail
router.get("/verifyAccount/:verifyId", userController.getVerifyEmail);
module.exports = router;

// POST /user/resetPassword
router.post(
  "/resetPassword",
  resetPostValidations,
  userController.postResetPassword
);

// get /user/resetPassword
router.post(
  "/sendResetMail",
  resetGetValidations,
  userController.postSendResetMail
);
