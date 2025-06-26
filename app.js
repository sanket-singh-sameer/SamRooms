const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingsRouter = require("./routes/listings");
const reviewsRouter = require("./routes/reviews");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash")
const passport= require("passport")
const LocalStrategy=require("passport-local")
const User=require("./models/users.js")
const usersRouter = require("./routes/users");


const sessionOptions = {
  secret: "secrethaibabu",
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now()+1000*60*60*24*3,
    maxAge: 1000*60*60*24*3,
    httpOnly: true
  }
};


app.use(cookieParser("1234abcd"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(session(sessionOptions))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




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

app.use((req,res,next)=>{
  res.locals.success=req.flash("success")
  res.locals.failure=req.flash("failure")
  next();
})
// app.get("/demouser", async (req,res)=>{
//   let fakeUser=new User({
//     email: "demo@gmail.com",
//     username: "demo-user",
//   })

//   let registeredUser = await User.register(fakeUser,"PassDemo")
//   res.send(registeredUser)
// })

app.use("/listings", listingsRouter);
app.use("/listings/:id/review", reviewsRouter);
app.use("/", usersRouter);

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
