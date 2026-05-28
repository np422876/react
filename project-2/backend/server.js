const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");

const User = require("./models/User");
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

app.post("/api/auth/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message:
          "User already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser = new User({

      name,

      email,

      password:
        hashedPassword

    });

    await newUser.save();

    res.status(201).json({
      message:
        "User registered successfully"
    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});

app.put("/api/properties/:id", async (req, res) => {

  try {

    const updatedProperty =
      await Property.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }

      );

    res.json(updatedProperty);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

});

app.delete("/api/properties/:id", async (req, res) => {

  try {

    await Property.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Property deleted successfully"
    });

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

}); 

app.post("/api/auth/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    // Check existing user

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message:
          "User already exists"
      });

    }

    // Hash password

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create new user

    const newUser = new User({

      name,

      email,

      password:
        hashedPassword

    });

    // Save user

    await newUser.save();

    res.status(201).json({
      message:
        "User registered successfully"
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// Start Server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});