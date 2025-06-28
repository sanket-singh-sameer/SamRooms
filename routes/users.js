const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/users.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../validations/middleware.js");
const userController = require("../controllers/users.js");



router.route("/signup")
.get(userController.signupFormRoute) // SignUp Form Route
.post(wrapAsync(userController.signupRoute)) //SignUp Post
router.route("/login")
.get(userController.loginFormRoute) // Login Form Route
.post(saveRedirectUrl, userController.loginRoute) //Login Post

// Logout Route
router.get("/logout", userController.logoutRoute);

module.exports = router;
