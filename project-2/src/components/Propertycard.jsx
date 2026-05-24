import React from "react";

import styles from
"./Propertycard.module.css";

import { Link }
from "react-router-dom";

function Propertycard(props) {

  const { property } = props;

  return (

    <div className={styles.card}>

      <Link
        to={`/properties/${property.id}`}
        className={styles.cardlink}
      >

        <img
          src={property.image}
          alt={property.title}
          className={styles.image}
        />

        <h3 className={styles.title}>
          {property.title}
        </h3>

      </Link>

      <div className={styles.content}>

        <span className={styles.badge}>
          FOR SALE
        </span>

        <h2 className={styles.price}>
          {property.price}
        </h2>

        <p className={styles.location}>
          {property.location}
        </p>

        <div className={styles.details}>

          <p>
            Bedrooms {property.beds}
          </p>

          <p>
            Bathrooms {property.baths}
          </p>

        </div>

        <button

          onClick={() =>
            props.handleSave(property)
          }

          className={
            props.isSaved
              ? styles.savedButton
              : styles.button
          }

        >

          {props.isSaved
            ? "Saved❤️"
            : "Save❤️"}

        </button>

      </div>

    </div>

  );

}

export default Propertycard;