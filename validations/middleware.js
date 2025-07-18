Listing=require("../models/listings")
Review=require("../models/reviews")


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


module.exports.isOwner= async(req,res,next)=>{
    const { id } = req.params;
    let listing= await Listing.findById(id)
    if(!listing.owner.equals(res.locals.isUser._id)) {
      req.flash("failure", "You don't have permission to do that!");
      return res.redirect(`/listings/${id}`);
    }
    next()
}


module.exports.isReviewAuthor= async(req,res,next)=>{
    const { reviewId } = req.params;
    let review= await Review.findById(reviewId)

    if(!review.author.equals(res.locals.isUser._id)) {
      req.flash("failure", "You don't have permission to do that!");
      return res.redirect(`/listings/${id}`);
    }
    next()
}