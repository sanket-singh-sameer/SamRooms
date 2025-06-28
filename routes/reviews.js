const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listings.js");
const { isLoggedIn, isReviewAuthor } = require("../validations/middleware.js");
const reviewController = require("../controllers/reviews.js");

// Review Creation Route
router.post("/", isLoggedIn, wrapAsync(reviewController.creationRoute));

// Review Deletion Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deletionRoute)
);

module.exports = router;
