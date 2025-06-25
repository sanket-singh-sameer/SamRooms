const express = require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listings.js");




// Review Creation Route
router.post(
  "/",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findOne({ _id: req.params.id });
    const newReview = new Review(req.body.review);
    console.log(listing);
    listing.reviews.push(newReview._id);

    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${req.params.id}`);
  })
);

// Review Deletion Route
router.delete("/:reviewId", wrapAsync(async(req,res)=>{
  let {id, reviewId}= req.params;
  // console.log("Hello")
  await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}})
  await Review.findByIdAndDelete(reviewId)
  res.redirect(`/listings/${req.params.id}`)
}));


module.exports=router;