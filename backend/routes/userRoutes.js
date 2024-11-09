const express = require("express");
const User = require("../models/User");
const Cart = require("../models/Cart");
const generateToken = require("../utils/generateToken");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) res.status(400).json(`User with email ${email} already exists.`);

  const user = await User.create({ name, email, password });

  if (user) {
    await Cart.create({userId:user._id});
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email});

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid Email or password" });
  }
});

module.exports = router;