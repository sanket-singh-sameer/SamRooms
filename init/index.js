const initData= require("./dataObject.js");
const Listing=require("../models/listings.js");
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";


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
    initData.data=initData.data.map((obj)=>({...obj,owner:"685da95a0a3fd899cd9006cc"}))
    await Listing.insertMany(initData.data)
    console.log("data was initializes")

}

initDB();