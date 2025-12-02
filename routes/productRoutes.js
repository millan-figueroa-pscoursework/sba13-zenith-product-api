const express = require("express");
const product = require("../models/Product");

const router = express.Router();

module.exports = router;

// get /api/products (supports filters sorting pagination)
router.get("/", async (req, res) => {
  try {
    // grab query params for filtering and paging
    const { category, minPrice, maxPrice, sortBy, page, limit } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let query = product.find(filter);

    if (sortBy === "price_asc") query = query.sort({ price: 1 });
    if (sortBy === "price_desc") query = query.sort({ price: -1 });

    const pagenumber = Number(page) || 1;
    const limitnumber = Number(limit) || 10;
    const skip = (pagenumber - 1) * limitnumber;

    const products = await query.skip(skip).limit(limitnumber);
    res.json(products);
  } catch (error) {
    // some wierd database or query problem
    res.status(500).json({ error: "failed to fetch products with filters" });
  }
});
