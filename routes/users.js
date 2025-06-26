const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/users.js");
const passport = require("passport");
const { saveRedirectUrl }= require("../validations/middleware.js")

router.get("/signup", (req, res) => {
  // res.send("form")
  res.render("./users/signup");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ username, email });
      const newRegisteredUser = await User.register(newUser, password);
      req.login(newRegisteredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to SamRooms");
        res.redirect("/listings");
      });

    } catch (e) {
      req.flash("failure", e.message);
      res.redirect("/signup");
      console.log(e.message);
    }
  })
);

router.get("/login", (req, res) => {
  // res.send("form")
  res.render("./users/login");
});

router.post("/login", saveRedirectUrl, function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("failure", info.message);
      return res.redirect("/login");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome Back to SamRooms");
    //   console.log(res.locals.redirectUrl)
      return res.redirect(res.locals.redirectUrl); // <-- FIXED
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are now logged out from SamRooms");
    res.redirect("/listings");
  });
});

module.exports = router;
