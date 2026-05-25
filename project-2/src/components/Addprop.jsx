import React, { useState, useContext } from "react";
import "./Addprop.css";
import { PropertyContext } from "../context/PropertyContext";

function Addprop() {

  const { properties, setProperties } =
    useContext(PropertyContext);

  const [showForm, setShowForm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [beds, setBeds] =
    useState("");

  const [baths, setBaths] =
    useState("");

  const [image, setImage] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [type, setType] =
    useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    // Validation

    if (
      !title ||
      !price ||
      !location ||
      !beds ||
      !baths ||
      !image ||
      !description ||
      !type
    ) {
      setError("Please fill all fields");
      return;
    }

    setError("");

    setLoading(true);

    const newProperty = {
      id: Date.now().toString(),
      title,
      price,
      location,
      beds: Number(beds),
      baths: Number(baths),
      image,
      description,
      type
    };

    

    // Simulate loading

    setTimeout(() => {

      const updatedProperties = [
        ...properties,
        newProperty
      ];

      setProperties(updatedProperties);

      localStorage.setItem(
        "properties",
        JSON.stringify(updatedProperties)
      );
window.location.reload();
      // Clear form

      setTitle("");
      setPrice("");
      setLocation("");
      setBeds("");
      setBaths("");
      setImage("");
      setDescription("");
      setType("");

      // Hide form

      setShowForm(false);

      setLoading(false);

    }, 3000);

  };

  return (

    <div className="add-property-container">
  
      {/* Button */}

      <button
        className="add-btn"
        onClick={() =>
          setShowForm(!showForm)
        }
      >

        {showForm
          ? "Close Form"
          : "Add Property"}

      </button>

      {/* Form */}

      {showForm && (

        <form
          className="form"
          onSubmit={handleSubmit}
        >

          <h2>
            Add Property
          </h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />

          <input
            type="number"
            className="number-field"
            placeholder="Bedrooms"
            min="0"
            value={beds}
            onChange={(e) =>
              setBeds(e.target.value)
            }
          />

          <input
            type="number"
            className="number-field"
            placeholder="Bathrooms"
            min="0"
            value={baths}
            onChange={(e) =>
              setBaths(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
          />

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >

            <option value="">
              Select Type
            </option>

            <option value="Apartment">
              Apartment
            </option>

            <option value="Villa">
              Villa
            </option>

            <option value="Flat">
              Flat
            </option>

            <option value="Studio">
              Studio
            </option>

            <option value="Bunglow">
              Bunglow
            </option>

            <option value="Mansion">
              Mansion
            </option>

          </select>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          {error && (
  <div className="error-box">
    <h3>⚠ {error}</h3>
  </div>
)}

          {/* Loading Skeleton */}

          {loading ? (

            <div className="skeleton-container">

              <div className="skeleton-card"></div>

            </div>

          ) : (
            
            
            <button type="submit">
              Add Property
            </button>

          )}

        </form>

      )}


    </div>

  );

}

export default Addprop;