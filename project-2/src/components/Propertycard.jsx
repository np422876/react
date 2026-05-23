import React from "react";
import styles from "./Propertycard.module.css";
import { Link } from "react-router-dom";

function Propertycard(props) {
  console.log(props.id)

  return (

    <div className={styles.card}>

      <Link
        to={`/properties/${props.id}`}
        className={styles.cardlink}
      >

        <img
          src={props.image}
          alt=""
          className={styles.image}
        />

      </Link>

      <div className={styles.content}>

        <span className={styles.badge}>
          FOR SALE
        </span>

        <Link
          to={`/properties/${props.id}`}
          className={styles.cardlink}
        >

          <h3 className={styles.title}>
            {props.title}
          </h3>

        </Link>

        <h2 className={styles.price}>
          {props.price}
        </h2>

        <p className={styles.location}>
          {props.location}
        </p>

        <div className={styles.details}>
          <p>Bedrooms {props.beds}</p>
          <p>Bathrooms {props.baths}</p>
        </div>

        <button className={styles.button}>
          Save ❤️
        </button>

      </div>

    </div>

  );
}

export default Propertycard;