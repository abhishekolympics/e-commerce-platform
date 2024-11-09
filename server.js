const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

dotenv.config();

// Log MongoDB URI to check if it's correctly loaded
console.log("MongoDB URI: ", process.env.MONGODB_URI);

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

// app.get("/", (req, res) => {
//   res.status(200).json("API is running.");
// });

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.use(express.static("./frontend/build"));

app.set("PORT", process.env.PORT || 5000);
console.log("++++++++++++++++" + app.get("PORT"));
const path = require("path");

// Log frontend build path
const buildPath = path.join(__dirname, "./frontend/build");
console.log("Frontend build path:", buildPath);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Error starting server:", error);
  process.exit(1); // Exit if the server fails to start
}
