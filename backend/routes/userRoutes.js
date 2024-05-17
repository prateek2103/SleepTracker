const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  signupValidations,
  loginValidations,
} = require("../validations/userValidations");

// POST /user/signup
router.post("/signup", signupValidations, userController.postSignup);

// POST /user/login
router.post("/login", loginValidations, userController.postLogin);

module.exports = router;
