module.exports.isLoggedIn = (req,res,next)=> {
  if (!req.isAuthenticated()) {
    req.flash("failure", "You must be logged in before performing this task!");
    return res.redirect("/login");
  }
  next()
};
