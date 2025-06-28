const Listing = require("../models/listings");
const cloudinary = require("../cloudinary");

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

module.exports.createRoute = async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);

    if (req.file) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "cloud-airbnb-dev",
      });
      newListing.image = {
        url: result.secure_url,
        filename: result.public_id,
      };
    } else {
      newListing.image = undefined; // or set a default image if you want
    }

    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created Successfully");
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
    req.flash("failure", "Image upload failed!");
    res.redirect("/listings/new");
  }
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
  const updateData = req.body.listing || {};

  // If a new image is uploaded, upload to Cloudinary
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "cloud-airbnb-dev",
      });
      updateData.image = {
        url: result.secure_url,
        filename: result.public_id,
      };
    } catch (err) {
      console.log(err);
      req.flash("failure", "Image upload failed!");
      return res.redirect(`/listings/${id}/edit`);
    }
  }

  // Find and update the listing, return the new document
  const listing = await Listing.findByIdAndUpdate(id, updateData, { new: true });

  if (!listing) {
    req.flash("failure", "Listing not found.");
    return res.redirect("/listings");
  }

  req.flash("success", "Listing Edited Successfully");
  res.redirect(`/listings/${id}`);
};
module.exports.deleteRoute = async (req, res) => {
  let { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully");
  res.redirect("/listings");
};
