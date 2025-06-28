Listing = require("../models/listings");

module.exports.indexRoute = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
};

module.exports.newListingForm = (req, res) => {
  // render new listing form
  res.render("./listings/new.ejs");
};

module.exports.showRoute = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  const reviewsList = await Listing.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash(
      "failure",
      "Listing you trying to access is either deleted or does not exists."
    );
    res.redirect("/listings");
  } else {
    res.render("./listings/show.ejs", { listing, reviewsList });
    console.log(reviewsList);
  }
};

module.exports.createRoute = async (req, res) => {
  const newListing = new Listing(req.body.listing);

  if (req.file) {
    const url = req.file.path;
    const filename = req.file.filename;
    newListing.image = { url, filename };
  } else {
    newListing.image = undefined; // or set a default image if you want
  }

  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Created Successfully");
  res.redirect("/listings");
};

module.exports.editRoute = async (req, res) => {
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
};

module.exports.updateRoute = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing);
  req.flash("success", "Listing Edited Successfully");
  res.redirect(`/listings/${id}`);
};
module.exports.deleteRoute = async (req, res) => {
  let { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully");
  res.redirect("/listings");
};
