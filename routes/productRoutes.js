const express = require("express");
const product = require("../models/Product");

const router = express.Router();

module.exports = router;

// get /api/products (basic get all products)
router.get("/", async (req, res) => {
  try {
    // retrieve all product docs from database
    const products = await product.find();
    res.json(products);
  } catch (error) {
    // somthing failed maybe database or query issue
    res.status(500).json({ error: "failed to fetch products" });
  }
});
