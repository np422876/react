import React from "react";
import styles from "./Propertycard.module.css";
import { Link } from "react-router-dom";

function Propertycard({
  property,
  handleSave,
  isSaved,
  onCardClick
}) {

  return (

    <div
      className={styles.card}
      onClick={() =>
        onCardClick?.(property)
      }
    >

      {/* IMAGE */}

      <Link
        to={`/properties/${property._id}`}
        className={styles.cardlink}
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <img
          src={property.image}
          alt={property.title}
          className={styles.image}
        />

        <span className={styles.badge}>
          FOR SALE
        </span>

        <h3 className={styles.title}>
          {property.title}
        </h3>

      </Link>

      {/* PRICE */}

      <h2 className={styles.price}>
        {property.price}
      </h2>

      {/* LOCATION */}

      <p className={styles.location}>
        {property.location}
      </p>

      {/* DETAILS */}

      <div className={styles.details}>

        <p>
          Bedrooms {property.beds}
        </p>

        <p>
          Bathrooms {property.baths}
        </p>

      </div>

      {/* SAVE BUTTON */}

      <button

  type="button"

  onClick={(e) => {

    e.preventDefault();

    e.stopPropagation();

    handleSave(property);

  }}

  className={

    isSaved

      ? styles.savebtn

      : styles.button

  }

>

  {isSaved

    ? "Saved❤️"

    : "Save❤️"}

</button>

    </div>

  );

}

export default Propertycard;