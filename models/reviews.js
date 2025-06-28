require('dotenv').config();
const mongoose = require("mongoose");

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
const modelName = "Review";

// Delete model if already exists (important for dev environments)
if (mongoose.models[modelName]) {
  delete mongoose.models[modelName];
  delete mongoose.modelSchemas[modelName];
}

// Schema
const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
});

// Create model
const Review = mongoose.model(modelName, reviewSchema);

module.exports = Review;
