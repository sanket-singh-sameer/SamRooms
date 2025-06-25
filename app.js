const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listings=require("./routes/listings")
const reviews=require("./routes/reviews")

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


app.use("/listings", listings)
app.use("/listings/:id/review", reviews)







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
