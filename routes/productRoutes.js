const express = require("express");
const product = require("../models/Product");

const router = express.Router();

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
    // somthing failed maybe database or query issue
    res.status(500).json({ error: "failed to fetch products with filters" });
  }
});

// post /api/products (create a new product)
router.post("/", async (req, res) => {
  try {
    // create a new product from request body data
    const newproduct = await product.create(req.body);
    res.status(201).json(newproduct);
  } catch (error) {
    // validation failed or other bad input stuff
    res.status(400).json({ error: error.message });
  }
});

// get /api/products/:id (get a single product by id)
router.get("/:id", async (req, res) => {
  try {
    // try finding the product by its id
    const found = await product.findById(req.params.id);

    if (!found) {
      // no product with that id in database
      return res.status(404).json({ error: "product not found" });
    }

    res.json(found);
  } catch (error) {
    // likely an invalid object id format
    res.status(400).json({ error: "invalid product id" });
  }
});

// put /api/products/:id (update a product by id)
router.put("/:id", async (req, res) => {
  try {
    // update product and return the new version
    const updated = await product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      // nothing to update if id not found
      return res.status(404).json({ error: "product not found" });
    }

    res.json(updated);
  } catch (error) {
    // validation error or some other wierd issue
    res.status(400).json({ error: error.message });
  }
});

// delete /api/products/:id (delete a product by id)
router.delete("/:id", async (req, res) => {
  try {
    // try deleting the product with this id
    const deleted = await product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      // nothing was deleted because id did not match anything
      return res.status(404).json({ error: "product not found" });
    }

    res.json({ message: "product deleted succesfully" });
  } catch (error) {
    // usually bad id format
    res.status(400).json({ error: "invalid product id" });
  }
});

module.exports = router;
