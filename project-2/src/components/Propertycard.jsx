import React from "react";
import styles from "./Propertycard.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Propertycard({
  property,
  handleSave,
  isSaved,
  onCardClick
}) {

  const navigate = useNavigate();
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

    console.log(property);

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

<button
  className={styles.deletebtn}
  onClick={async (e) => {

    e.stopPropagation();

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this property?"
      );

    if (!confirmDelete) return;

    try {

      await fetch(

        `http://localhost:8000/api/properties/${property._id}`,

        {

          method: "DELETE"

        }

      );

      window.location.reload();

    }

    catch (error) {

      console.log(error);

    }

  }}

>

  Delete

</button>

    </div>

  );

}

export default Propertycard;