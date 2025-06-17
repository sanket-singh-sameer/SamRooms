const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";
const path = require("path");
const methodOverride= require("method-override")
const ejsMate = require("ejs-mate")


app.use(methodOverride("_method"))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}))
app.engine("ejs",ejsMate)
app.use(express.static(path.join(__dirname,"/public")))




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
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
});

//New Form Route
app.get("/listings/new", (req, res) => {
  // render new listing form
  res.render("./listings/new.ejs")
});

// Show Route
app.get("/listings/:id", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  res.render("./listings/show.ejs", { listing });
});

//Create Route
app.post("/listings", async (req,res)=>{
  // const listing=req.body.listing
  const newListing= new Listing(req.body.listing)
  await newListing.save()
  console.log(Listing)
  // console.log(listing)
  res.redirect("/listings")
})


// Edit Route
app.get("/listings/:id/edit", async (req,res)=>{
  const listing = await Listing.findById(req.params.id);
  res.render("./listings/edit.ejs", {listing})
})

// Update Route
app.put("/listings/:id", async (req,res)=>{
  let {id}=req.params
  await Listing.findByIdAndUpdate(id,{...req.body.listing})
  res.redirect(`/listings/${id}`)
})

// Delete Route
app.delete("/listings/:id",async(req,res)=>{
  let {id}=req.params
  const deletedListing= await Listing.findByIdAndDelete(id)
  res.redirect("/listings")
  console.log("Deleted Listing"+deletedListing)
})

app.listen(port, () => {
  console.log("Listening to port 8080");
});

