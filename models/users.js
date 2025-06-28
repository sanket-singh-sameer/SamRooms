require('dotenv').config();
const mongoose = require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose")

const MONGO_URL = process.env.MONGO_ATLAS;

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("connection to db successful from model.js");
  })
  .catch((err) => {
    console.log(err);
  });

// Model name
const modelName = "User";

// Delete model if already exists (important for dev environments)
if (mongoose.models[modelName]) {
  delete mongoose.models[modelName];
  delete mongoose.modelSchemas[modelName];
}

// Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required:true,
  },

});

userSchema.plugin(passportLocalMongoose);
// Create model
const User = mongoose.model(modelName, userSchema);

module.exports = User;
