require("dotenv").config();
const express = require("express");
const connectdb = require("./config/connection");

connectdb();

const app = express();
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
