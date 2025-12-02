const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

async function run() {
  try {
    // connct the client to the server
    await mongoose.connect(uri);
    // establish and verify connection
    console.log("Connected successfully to Mongodb!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

run();
