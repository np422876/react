const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const Property = require("./models/Property");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 8000;

// MongoDB Connection

mongoose.connect(process.env.MONGO_URI)

.then(() => {
  console.log("MongoDB Connected");
})

.catch((error) => {
  console.log(error);
});

// Home Route

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Properties Route

app.get("/api/properties", async (req, res) => {

  try {

    const properties =
      await Property.find();

    res.json(properties);

  }

  catch (error) {

    res.status(500).json({
      message: "Failed to fetch properties"
    });

  }

});

// Start Server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});