const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const Review = require("./models/reviews.js");
const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const listingSchemaValidation = require("./validations/listing.validation.js");
const reviewSchemaValidation = require("./validations/review.validation.js");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("connection to db successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hello");
});

// Index Route
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
  })
);

//New Form Route
app.get("/listings/new", (req, res) => {
  // render new listing form
  res.render("./listings/new.ejs");
});

// Show Route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const reviewsList = await Listing.findById(req.params.id).populate("reviews");
    res.render("./listings/show.ejs", { listing , reviewsList});
  })
);

//Create Route
app.post(
  "/listings",
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
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("./listings/edit.ejs", { listing });
  })
);

// Update Route
app.put(
  "/listings/:id",
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
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log("Deleted Listing" + deletedListing);
  })
);

// Review Creation Route
app.post(
  "/listings/:id/review",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById({ _id: req.params.id });
    const newReview = new Review(req.body.review);
    console.log(listing);
    listing.reviews.push(newReview._id);

    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${req.params.id}`);
  })
);

// Review Deletion Route
app.delete("/listings/:id/review/:reviewId", wrapAsync(async(req,res)=>{
  let {id, reviewId}= req.params;
  // console.log("Hello")
  await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}})
  await Review.findByIdAndDelete(reviewId)
  res.redirect(`/listings/${req.params.id}`)
}));




// 404 Page Not Found
app.use("/", (req, res, next) => {
  // res.status(404).send("Page not found");
  next(new ExpressError(403, "Page Note Found"));
});

//Error Handeling
app.use((err, req, res, next) => {
  let { statusCode = 505, message = "Something Went Wrong" } = err;
  // res.status(statusCode).send(message);
  res.render("./errors/error.ejs", { statusCode, message });
});

app.listen(port, () => {
  console.log("Listening to port 8080");
});
