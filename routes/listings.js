const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner } = require("../validations/middleware.js");
const listingController = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(listingController.indexRoute)) //Index Route
  .post(isLoggedIn, wrapAsync(listingController.createRoute)); //Create Route

// New Form Route (must come before /:id)
router.route("/new").get(isLoggedIn, listingController.newListingForm);

// Show, Edit, Update, Delete routes
router
  .route("/:id")
  .get(wrapAsync(listingController.showRoute))
  .put(isLoggedIn, isOwner, listingController.updateRoute)
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteRoute)); // Delete Route

// Edit Route
router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, wrapAsync(listingController.editRoute)); //Edit Route

module.exports = router;
