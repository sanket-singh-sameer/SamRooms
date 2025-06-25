const express = require("express");
const router=express.Router();
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
    const reviewsList = await Listing.findById(req.params.id).populate("reviews");
    res.render("./listings/show.ejs", { listing , reviewsList});
  })
);

//Create Route
router.post(
  "/",
  wrapAsync(async (req, res) => {
    // req.body.listing.price = Number(req.body.listing.price);
    // const result = listingSchema.parse(req.body); // throws on error
    // console.log(result); // valid object

    const newListing = new Listing(req.body.listing);

    if (newListing.image === "") {
      newListing.image = undefined; // triggers default
    }
    await newListing.save();
    console.log(Listing);
    // console.log(listing)
    res.redirect("/listings");
  })
);

// Edit Route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("./listings/edit.ejs", { listing });
  })
);

// Update Route
router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    if ((!req, body.listing)) {
      throw new ExpressError(400, "Send some valid listing details.");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  })
);

// Delete Route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log("Deleted Listing" + deletedListing);
  })
);


module.exports=router;