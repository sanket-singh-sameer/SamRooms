Review = require("../models/reviews");

module.exports.creationRoute = async (req, res) => {
  const listing = await Listing.findOne({ _id: req.params.id });
  const newReview = new Review(req.body.review);
  console.log(listing);
  listing.reviews.push(newReview._id);
  newReview.author = req.user._id;

  console.log(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Added!");
  res.redirect(`/listings/${req.params.id}`);
};
module.exports.deletionRoute = async (req, res) => {
  let { id, reviewId } = req.params;
  // console.log("Hello")
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${req.params.id}`);
};
