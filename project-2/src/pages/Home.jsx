import React from "react";
import Addprop from "../components/Addprop";
import "./Home.css";

function Home({ properties, setProperties }) {

  return (
    <div className="home-hero">
      <h1>Find Your Dream Home</h1>

      <p>
        Browse apartments, villas, flats, and luxury
        properties in one place. Discover your perfect home today!
      </p>
    </div>
  );
}

export default Home;