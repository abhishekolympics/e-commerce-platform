const express = require("express");
const Cart = require("../models/Cart");
const mongoose = require('mongoose');
const router = express.Router();

// Add an item to the cart
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex((item) =>
        item.productId.equals(productId)
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
});

// Fetch cart items
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "items.productId"
    );
    res.status(200).json(cart ? cart.items : []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});

router.delete("/remove", async (req, res) => {
  try {
    const cart = await Cart.deleteOne({
      userId: req.params.userId,
      productId: req.params.producutId,
    });
    res.status(200).json({ message: "Item deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item." });
  }
});

router.put("/update", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    // Find the cart item by userId and productId and update the quantity
    const result = await Cart.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId), "items.productId": new mongoose.Types.ObjectId(productId) },
      { $set: { "items.$.quantity": quantity } }, // Update the quantity of the matched item
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    res.status(200).json("Quantity updated successfully");
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error updating item." });
  }
});

module.exports = router;
