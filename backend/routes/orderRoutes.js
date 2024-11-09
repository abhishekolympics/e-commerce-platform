// routes/orderRoutes.js
const express = require('express');
const protect = require('../middleware/authmiddleware');
const router = express.Router();

router.get('/myorders', protect, (req, res) => {
  // Only authenticated users can access this
  res.json({ message: 'Order history for user' });
});

module.exports = router;
