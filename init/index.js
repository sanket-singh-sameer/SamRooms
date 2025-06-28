require('dotenv').config();
const initData= require("./dataObject.js");
const Listing=require("../models/listings.js");
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_ATLAS;


main()
.then(() => {
    console.log("connection to db successful");
})
.catch((err) => {
    console.log(err);
});


async function main() {
  await mongoose.connect(MONGO_URL);
}





const initDB=async()=>{
    await Listing.deleteMany({})
    initData.data=initData.data.map((obj)=>({...obj,owner:"685ffdc35c604f77907c281b"}))
    await Listing.insertMany(initData.data)
    console.log("data was initializes")

}

initDB();