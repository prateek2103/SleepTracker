const router = require("express").Router();
const userController = require("../controllers/userController");
const { signupValidations } = require("../validations/userValidations");

// POST /user/signup
router.post("/signup", signupValidations, userController.postSignup);

module.exports = router;
