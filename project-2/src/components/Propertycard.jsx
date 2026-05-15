import React from "react";
import img from "../assets/apartment.png";
import "./Propertycard.css";
import Save from "./Save";
import "./Save.css";
import { Link } from "react-router-dom";

const Propertycard = ({ id, title, price, location, beds, baths, image }) => {
  return (
    <div className="container">
    <Link to={`/properties/${id}`} className="property-link">
        <img src={img} alt={title} />
        <h2>{title}</h2>
        </Link>
        <p>{price}</p>
        <p>{location}</p>
        <p>{beds} Bedrooms </p>
        <p>{baths} Bathrooms</p>
        <Save />
      </div>
        
  )
}

export default Propertycard