const mongoose = require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose")

const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";

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
