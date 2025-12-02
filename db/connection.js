const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("MONGO_URI not found in .env file");
  process.exit(1);
}

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // stop srver if db fails
  });
