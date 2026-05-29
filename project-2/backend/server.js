const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Property = require("./models/Property");

const authMiddleware =
  require("./middleware/authMiddleware");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT =
  process.env.PORT || 8000;

// MongoDB Connection

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log(
    "MongoDB Connected"
  );

})

.catch((error) => {

  console.log(error);

});

// Home Route

app.get("/", (req, res) => {

  res.send(
    "Server is running"
  );

});

// GET All Properties

app.get(
  "/api/properties",

  async (req, res) => {

    try {

      const properties =
        await Property.find();

      res.json(properties);

    }

    catch (error) {

      res.status(500).json({

        message:
          "Failed to fetch properties"

      });

    }

  }

);

app.get("/api/properties/:id", async (req, res) => {

  try {

    const property =
      await Property.findById(
        req.params.id
      );

    res.json(property);

  }

  catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

});

// POST Property

app.post(
  "/api/properties",

  authMiddleware,

  async (req, res) => {

    try {

      const newProperty =
        new Property(req.body);

      await newProperty.save();

      res.status(201).json(
        newProperty
      );

    }

    catch (error) {

      res.status(400).json({

        message:
          error.message

      });

    }

  }

);

// PUT Property

app.put(
  "/api/properties/:id",

  async (req, res) => {

    try {

      const updatedProperty =
        await Property.findByIdAndUpdate(

          req.params.id,

          req.body,

          { new: true }

        );

      res.json(updatedProperty);

    }

    catch (error) {

      res.status(400).json({

        message:
          error.message

      });

    }

  }

);

// DELETE Property

app.delete(
  "/api/properties/:id",

  async (req, res) => {

    try {

      await Property.findByIdAndDelete(

        req.params.id

      );

      res.json({

        message:
          "Property deleted successfully"

      });

    }

    catch (error) {

      res.status(400).json({

        message:
          error.message

      });

    }

  }

);

// REGISTER

app.post(
  "/api/auth/register",

  async (req, res) => {

    try {

      const {
        name,
        email,
        password
      } = req.body;

      // Check Existing User

      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {

        return res.status(400).json({

          message:
            "User already exists"

        });

      }

      // Hash Password

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // Create User

      const newUser =
        new User({

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

        message:
          error.message

      });

    }

  }

);

// LOGIN

app.post(
  "/api/auth/login",

  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      // Find User

      const user =
        await User.findOne({
          email
        });

      if (!user) {

        return res.status(400).json({

          message:
            "User not found"

        });

      }

      // Toggle Favorite

app.post(

  "/api/user/favorite/:propertyId",

  authMiddleware,

  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        );

      const propertyId =
        req.params.propertyId;

      const alreadySaved =
        user.favorites.includes(
          propertyId
        );

      if (alreadySaved) {

        user.favorites =
          user.favorites.filter(

            (id) =>

              id.toString() !==
              propertyId

          );

      }

      else {

        user.favorites.push(
          propertyId
        );

      }

      await user.save();

      res.json({

        message:
          "Favorites updated",

        favorites:
          user.favorites

      });

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);

// Get Favorites

app.get(

  "/api/user/favorites",

  authMiddleware,

  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        ).populate("favorites");

      res.json(
        user.favorites
      );

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);

      // Compare Password

      const isMatch =
        await bcrypt.compare(

          password,

          user.password

        );

      if (!isMatch) {

        return res.status(400).json({

          message:
            "Invalid password"

        });

      }

      // Generate JWT

      const token =
        jwt.sign(

          {

            id: user._id

          },

          process.env.JWT_SECRET,

          {

            expiresIn: "1d"

          }

        );

      res.json({

  message:
    "Login successful",

  token,

  user: {

    name: user.name,

    email: user.email

  }

});

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);

// Protected Route

app.get(

  "/api/protected",

  authMiddleware,

  (req, res) => {

    res.json({

      message:
        "Protected route accessed"

    });

  }

);

// Start Server

app.listen(PORT, () => {

  console.log(
    `Server running on port ${8000}`
  );

});