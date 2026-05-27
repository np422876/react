const mongoose = require("mongoose");

const dotenv = require("dotenv");

const Property = require("./models/Property");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)

.then(async () => {

  console.log("MongoDB Connected");

  await Property.deleteMany();

  await Property.insertMany([

    {
      title: "Cozy Studio",
      price: "₹1,00,000",
      location: "Ahmedabad, Gujarat",
      bedrooms: 1,
      bathrooms: 1,
      image: "https://via.placeholder.com/300",
      description: "Beautiful studio apartment"
    },

    {
      title: "Family House",
      price: "₹90,00,000",
      location: "Mumbai, Maharashtra",
      bedrooms: 3,
      bathrooms: 2,
      image: "https://via.placeholder.com/300",
      description: "Perfect family house"
    },

    {
      title: "Beachside Apartment",
      price: "₹50,00,000",
      location: "Panaji, Goa",
      bedrooms: 2,
      bathrooms: 2,
      image: "https://via.placeholder.com/300",
      description: "Sea facing apartment"
    },

    {
      title: "Penthouse Suite",
      price: "₹2,00,00,000",
      location: "Bangalore, Karnataka",
      bedrooms: 5,
      bathrooms: 4,
      image: "https://via.placeholder.com/300",
      description: "Luxury penthouse"
    },

    {
      title: "Suburban Home",
      price: "₹70,00,000",
      location: "Jaipur, Rajasthan",
      bedrooms: 4,
      bathrooms: 3,
      image: "https://via.placeholder.com/300",
      description: "Spacious suburban home"
    },

    {
      title: "City Flat",
      price: "₹1,00,00,000",
      location: "Hyderabad, Telangana",
      bedrooms: 3,
      bathrooms: 2,
      image: "https://via.placeholder.com/300",
      description: "Modern city flat"
    },

    {
      title: "Skyline Apartment",
      price: "₹80,00,000",
      location: "Kochi, Kerala",
      bedrooms: 3,
      bathrooms: 2,
      image: "https://via.placeholder.com/300",
      description: "Apartment with skyline view"
    },

    {
      title: "Nature Villa",
      price: "₹95,00,000",
      location: "Surat, Gujarat",
      bedrooms: 4,
      bathrooms: 3,
      image: "https://via.placeholder.com/300",
      description: "Villa surrounded by nature"
    }

  ]);

  console.log("Data Seeded");

  process.exit();

})

.catch((error) => {
  console.log(error);
});