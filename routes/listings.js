const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");

// Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
  })
);

//New Form Route
router.get("/new", (req, res) => {
  // render new listing form
  res.render("./listings/new.ejs");
});

// Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const reviewsList = await Listing.findById(req.params.id).populate(
      "reviews"
    );
    if (!listing) {
      req.flash(
        "failure",
        "Listing you trying to access is either deleted or does not exists."
      );
      res.redirect("/listings");
    } else {
      res.render("./listings/show.ejs", { listing, reviewsList });
    }
  })
);

//Create Route
router.post(
  "/",
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    if (newListing.image === "") {
      newListing.image = undefined; // triggers default
    }
    await newListing.save();
    req.flash("success", "New Listing Created Successfully");
    // console.log(listing)
    res.redirect("/listings");
  })
);

// Edit Route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash(
        "failure",
        "Listing you trying to access is either deleted or does not exists."
      );
      res.redirect("/listings");
    } else {
      res.render("./listings/edit.ejs", { listing });
    }
  })
);

// Update Route
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing);
  req.flash("success", "Listing Edited Successfully");
  res.redirect(`/listings/${id}`);
});

// Delete Route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully");
    res.redirect("/listings");
  })
);

module.exports = router;
