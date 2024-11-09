const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB is connected.");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB=", error);
  });

app
  .get("/", (req, res) => {
    res.status(200).json("API is running.");
  });

app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);

PORT = 5000;

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})