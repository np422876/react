import React from "react";
import "./Propertymodal.css";

function Propertymodal({
  property,
  onClose
}) {

if (!property) {
  return null;
}
  return (

    <div
      className="modal-backdrop"
      onClick={onClose}
    >

      <div
        className="modal-content"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <img
          src={property.image}
          alt={property.title}
        />

        <h2>
          {property.title}
        </h2>

        <p>
          📍 {property.location}
        </p>

        <p>
          💰 {property.price}
        </p>

        <p>
          🛏 {property.beds} Beds
        </p>

        <p>
          🛁 {property.baths} Baths
        </p>

        <p>
          {property.description}
        </p>

        <button onClick={onClose}>
          Close
        </button>

      </div>

    </div>

  );

}

export default Propertymodal;