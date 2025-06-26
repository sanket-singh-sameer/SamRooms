module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // fixed typo here
    req.flash("failure", "You must be logged in before performing this task!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) { // use the same property name
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl; // clear it after using
  } else {
    res.locals.redirectUrl = "/listings";
  }
  next();
};
