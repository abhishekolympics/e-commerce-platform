const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    
    const query = {};

    if(search) {
      query.name= {$regex: search, $options: 'i'};
    }

    if(category) {
      query.category = category;
    }

    if(minPrice || maxPrice)
    {
      query.price = {};
      if(minPrice) query.price.$gte = minPrice;
      if(maxPrice) query.price.$lte = maxPrice;
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.status(200).json(product);
    else res.status(400).json({ message: "Product not found." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
