import React from "react";
import PropertyCard from "./Propertycard.css";


const PropertyCard = ({ title, price, location, beds, baths, image }) => {
  return (
    <div className="container">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{price}</p>
      <p>{location}</p>
      <p>{beds} </p>
      <p>  {baths} Baths</p>
    </div>
  );
};

export default PropertyCard;