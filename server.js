require("dotenv").config();
const express = require("express");
require("./db/connection");

const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
