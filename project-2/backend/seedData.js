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
    id: "1",
    title: "Nature Bliss Apartment",
    type: "Apartment",
    price: "₹32,00,000",
    location: "Bhopal",
    beds: 3,
    baths: 2,
    description: "Luxury 3BHK apartment crafted with elegant modern interiors, spacious bedrooms, attached premium bathrooms, and a beautifully designed modular kitchen with ample storage. The apartment features a bright living and dining area, large balcony with scenic views, covered parking, power backup, and 24/7 gated security. Located in a prime residential area close to shopping malls, reputed schools, hospitals, restaurants, and metro connectivity, making it ideal for comfortable family living.",
    image: "https://images.unsplash.com/photo-1430285561322-7808604715df"
  },
  {
    id: "2",
    title: "White Oak Villa",
    type: "Villa",
    price: "₹85,00,000",
    location: "Bhopal",
    beds: 3,
    baths: 2,
    description: "Beautiful independent villa designed with premium architecture, spacious interiors, and luxurious modern finishes throughout. The property offers large bedrooms with attached bathrooms, an elegant living area, modular kitchen, landscaped private garden, swimming pool, and spacious outdoor seating space perfect for relaxation and gatherings. Situated in a peaceful upscale neighborhood with excellent connectivity to schools, hospitals, shopping centers, and major city routes, this villa delivers the perfect balance of comfort, privacy, and luxury living.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be"
  },
  {
    id: "3",
    title: "Golden Pearl Home",
    type: "Bunglow",
    price: "₹45,00,000",
    location: "Lucknow",
    beds: 3,
    baths: 2,
    description: "Luxury independent bungalow featuring spacious living and dining areas with elegant interiors, premium wooden flooring, large sunlit bedrooms, attached modern bathrooms, and a fully equipped modular kitchen. The property includes a landscaped front lawn, covered parking space, private terrace, and round-the-clock security. Located in a peaceful residential neighborhood with easy access to schools, hospitals, shopping centers, and public transport.",
    image: "https://images.unsplash.com/photo-1464146072230-91cabc968266"
  },
  {
    id: "4",
    title: "Dream Mansion",
    type: "Mansion",
    price: "₹1,50,00,000",
    location: "Delhi",
    beds: 7,
    baths: 6,
    description: "Grand ultra-luxury mansion designed with world-class architecture and lavish interiors. This premium property offers expansive living spaces, designer bedrooms with walk-in wardrobes, luxurious bathrooms, a private home theater, indoor gym, swimming pool, landscaped gardens, and rooftop lounge. Equipped with smart home features, high-end security systems, and premium fittings throughout, the mansion delivers an unmatched luxury lifestyle in one of the city’s most prestigious locations.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  },
  {
    id: "5",
    title: "Smart City Flat",
    type: "Flat",
    price: "₹26,00,000",
    location: "Noida",
    beds: 2,
    baths: 2,
    description: "Contemporary city flat offering stylish interiors with modern finishes and smart space planning. The apartment includes spacious bedrooms, attached bathrooms, a modular kitchen with storage cabinets, a bright living room, and a balcony with open city views. Residents enjoy facilities such as elevators, covered parking, power backup, and 24/7 security. Conveniently located close to IT hubs, schools, shopping malls, and metro connectivity.",
    image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09"
  },
  {
    id: "6",
    title: "Blue Lagoon House",
    type: "Bunglow",
    price: "₹52,00,000",
    location: "Goa",
    beds: 4,
    baths: 3,
    description: "Beautiful beachside house designed for relaxed coastal living with airy interiors, large windows for natural light, and elegant tropical-style décor. The home features spacious bedrooms, attached bathrooms, a modern kitchen, private garden patio, and cozy outdoor seating areas. Situated near popular beaches, cafes, and entertainment spots, this property is ideal for those seeking a peaceful and luxurious lifestyle by the sea.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },
  {
    id: "7",
    title: "Mountain Retreat",
    type: "Villa",
    price: "₹70,00,000",
    location: "Shimla",
    beds: 5,
    baths: 4,
    description: "Premium mountain-view villa surrounded by lush greenery and scenic landscapes. The property offers spacious bedrooms with balconies, wooden interiors, a cozy fireplace, a large living area, and a stylish modular kitchen. Floor-to-ceiling windows provide breathtaking views of the hills and valleys. Perfect for nature lovers looking for a peaceful retreat with modern comforts and privacy.",
    image: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2"
  },
  {
    id: "8",
    title: "Palm Residency",
    type: "Flat",
    price: "₹60,00,000",
    location: "Kochi",
    beds: 4,
    baths: 3,
    description: "Modern residential flat thoughtfully designed with elegant interiors, spacious bedrooms, contemporary bathrooms, and a well-equipped modular kitchen. The apartment features a bright living room, balcony space, covered parking, and excellent ventilation throughout. Residents benefit from gated security, elevators, nearby supermarkets, schools, and healthcare facilities, making it ideal for comfortable family living.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
  },
  {
    id: "9",
    title: "Comfort Stay",
    type: "Flat",
    price: "₹20,00,000",
    location: "Nagpur",
    beds: 1,
    baths: 1,
    description: "Affordable yet stylish compact flat designed for practical urban living. The property includes a comfortable bedroom, attached bathroom, compact kitchen area, and bright living space with good ventilation. Located in a well-connected neighborhood with nearby markets, schools, public transport, and daily convenience stores, this home is ideal for working professionals or small families.",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607"
  },
  {
    id: "10",
    title: "Elite Heights",
    type: "Flat",
    price: "₹48,00,000",
    location: "Kolkata",
    beds: 3,
    baths: 3,
    description: "Elegant urban apartment featuring premium interiors, spacious bedrooms, modern bathrooms, and a beautifully designed modular kitchen. The property also includes a private balcony, spacious dining area, covered parking, and high-quality fittings throughout. Situated in a prime residential area with excellent connectivity to business districts, hospitals, schools, and entertainment zones.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },
  {
    id: "11",
    title: "Lakeview Cottage",
    type: "Bunglow",
    price: "₹55,00,000",
    location: "Nainital",
    beds: 4,
    baths: 3,
    description: "Charming lakeside cottage designed for peaceful living with cozy wooden interiors and breathtaking water views. The property offers spacious bedrooms, modern bathrooms, a fireplace-equipped living room, and a private balcony overlooking the lake. Surrounded by natural beauty and greenery, this cottage provides a perfect escape for weekend retreats or serene full-time living.",
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471"
  },
  {
    id: "12",
    title: "Royal Palace Home",
    type: "Bunglow",
    price: "₹1,00,10,000",
    location: "Udaipur",
    beds: 6,
    baths: 5,
    description: "Royal-inspired luxury bungalow showcasing elegant architecture, grand living spaces, designer interiors, and premium furnishings. The home includes spacious bedrooms with attached bathrooms, a modular kitchen, landscaped gardens, private parking, and stylish outdoor seating areas. Located in a premium residential neighborhood offering a blend of comfort, sophistication, and privacy.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
  },
  {
    id: "13",
    title: "Urban Nest",
    type: "Flat",
    price: "₹1,00,00,000",
    location: "Indore",
    beds: 2,
    baths: 2,
    description: "Modern apartment built with smart design and contemporary architecture, featuring spacious bedrooms, elegant bathrooms, a modular kitchen, and naturally lit living spaces. The property includes balcony access, covered parking, security services, and proximity to offices, shopping centers, schools, and entertainment hubs for convenient urban living.",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
  },
  {
    id: "14",
    title: "Green Valley Villa",
    type: "Bunglow",
    price: "₹80,00,000",
    location: "Surat",
    beds: 5,
    baths: 4,
    description: "Luxurious independent villa featuring spacious interiors, premium flooring, elegant bedrooms, attached bathrooms, landscaped outdoor areas, and a beautifully designed modular kitchen. The villa also includes private parking, terrace space, and excellent natural lighting throughout. Located in a peaceful neighborhood offering privacy, comfort, and premium lifestyle amenities.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
  },
  {
    id: "15",
    title: "Skyline Residency",
    type: "Bunglow",
    price: "₹35,00,000",
    location: "Chennai",
    beds: 3,
    baths: 2,
    description: "Comfortable family residence designed with spacious living areas, modern interiors, airy bedrooms, and attached bathrooms. The home features a dining area, balcony space, covered parking, and a fully equipped kitchen with storage solutions. Situated in a safe residential locality with nearby schools, parks, hospitals, and shopping facilities.",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118"
  },
  {
    id: "16",
    title: "Penthouse Suite",
    type: "Villa",
    price: "₹1,20,000",
    location: "Hyderabad",
    beds: 5,
    baths: 4,
    description: "Exclusive penthouse suite offering panoramic city skyline views and luxurious interiors. The property features spacious bedrooms, designer bathrooms, a modern open kitchen, rooftop terrace, lounge space, and premium smart-home features. High-end amenities including private elevator access, covered parking, and 24/7 security create a truly luxurious urban lifestyle experience.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
  },
  {
    id: "17",
    title: "Beachside Mansion",
    type: "Mansion",
    price: "₹90,00,000",
    location: "Goa",
    beds: 6,
    baths: 5,
    description: "Massive beachfront mansion offering unmatched luxury with sea-facing balconies, elegant interiors, spacious bedrooms, designer bathrooms, private swimming pool, landscaped gardens, and premium entertainment areas. This high-end property combines privacy, comfort, and breathtaking ocean views for a world-class residential experience.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
  },
  {
    id: "18",
    title: "Family House",
    type: "Bunglow",
    price: "₹40,00,000",
    location: "Delhi",
    beds: 4,
    baths: 3,
    description: "Beautiful family home designed for comfortable modern living with spacious bedrooms, attached bathrooms, large dining and living areas, and a stylish modular kitchen. The property also includes parking space, balcony access, excellent ventilation, and proximity to schools, parks, healthcare centers, and daily convenience stores.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },
  {
    id: "19",
    title: "Cozy Studio",
    type: "Studio",
    price: "₹18,00,000",
    location: "Pune",
    beds: 1,
    baths: 1,
    description: "Modern studio apartment designed with efficient space utilization and contemporary interiors. The property includes a stylish living area, compact kitchen setup, attached bathroom, storage solutions, and large windows for natural light. Located close to offices, cafes, metro stations, and shopping areas, making it perfect for young professionals and students.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156"
  },
  {
     id: "20",
    title: "Luxury Villa",
    type: "Villa",
    price: "₹75,00,000",
    location: "Mumbai",
    beds: 5,
    baths: 4,
    description: "Premium luxury villa featuring grand interiors, spacious bedrooms, elegant bathrooms, private garden areas, modular kitchen, and stylish architectural design. The property offers excellent ventilation, modern amenities, covered parking, and premium security systems. Located in a prime residential location with easy access to business districts, schools, hospitals, and entertainment centers.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be"
  }

  ]);

  console.log("Data Seeded");

  process.exit();

})

.catch((error) => {
  console.log(error);
});