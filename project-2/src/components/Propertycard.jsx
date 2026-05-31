import React, {memo} from "react";
import styles from "./Propertycard.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../assets/delete.png";

function Propertycard({
  property,
  handleSave,
  isSaved,
  onCardClick
}) {
  
const navigate = useNavigate();

  const handleDelete = async (e) => {

    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8000/api/properties/${property._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (response.ok) {

        alert("Property deleted successfully");

        window.location.reload();

      } else {

        alert(data.message);

      }

    }

    catch (error) {

      console.log(error);

      alert("Failed to delete property");

    }

  };

  return (

    <div
      className={styles.card}
      onClick={() =>
        onCardClick?.(property)
      }
    >

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

      <h2 className={styles.price}>
        {property.price}
      </h2>

      <p className={styles.location}>
        {property.location}
      </p>

      <div className={styles.details}>
        <p>Bedrooms {property.beds}</p>
        <p>Bathrooms {property.baths}</p>
      </div>

      <button
        type="button"
        className={
          isSaved
            ? styles.savebtn
            : styles.button
        }
        onClick={(e) => {

          e.preventDefault();

          e.stopPropagation();

          console.log(property);

          handleSave(property);

        }}
      >
        {isSaved
          ? "Saved ❤️"
          : "Save ❤️"}
      </button>

      <button
  className={styles.editbtn}
  onClick={(e) => {

    e.stopPropagation();

    navigate(
      `/edit-property/${property._id}`
    );

  }}
>
  Edit
</button>

      <button
  className={styles.deletebtn}
  onClick={handleDelete}
>
  <img
    src={deleteIcon}
    alt="Delete"
    className={styles.deleteIcon}
  />
</button>

    </div>

  );

}

export default memo(Propertycard);