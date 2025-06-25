const mongoose = require("mongoose");

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
});

// Create model
const Review = mongoose.model(modelName, reviewSchema);

module.exports = Review;
