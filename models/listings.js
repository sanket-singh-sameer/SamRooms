const mongoose = require("mongoose");

const Reviews = require("./reviews.js");

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
const modelName = "Listing";

// Delete model if already exists (important for dev environments)
if (mongoose.models[modelName]) {
  delete mongoose.models[modelName];
  delete mongoose.modelSchemas[modelName];
}

// Schema
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2018/05/31/15/06/see-no-evil-3444212_1280.jpg",
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Reviews.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// Create model
const Listing = mongoose.model(modelName, listingSchema);

module.exports = Listing;
