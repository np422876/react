import React,{useState,useContext} from "react";

import "./Addprop.css";

import {PropertyContext} from "../context/PropertyContext";

function Addprop() {

  const {properties,setProperties} = useContext(PropertyContext);

  const [showForm,setShowForm] =useState(false);

  const [loading,setLoading] =useState(false);

  const [error,setError] =useState("");

  const [title,setTitle] =useState("");

  const [price,setPrice] =useState("");

  const [location,setLocation] =useState("");

  const [beds,setBeds] =useState("");

  const [baths,setBaths] =useState("");

  const [image,setImage] =useState("");

  const [description,setDescription] =useState("");

  const [type,setType] =useState("");

  // Submit Form

  const handleSubmit =
    async (e) => {

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

        setError(
          "Please fill all fields"
        );

        return;

      }

      setError("");

      setLoading(true);

      // JWT Token

      const token =

        localStorage.getItem(
          "token"
        );

      // Property Object

      const newProperty = {

        title,

        price:
          price,

        location,

        beds:
          Number(beds),

        baths:
          Number(baths),

        image,

        description,

        type

      };

      try {

        const response =
          await fetch(

            "http://localhost:8000/api/properties",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`

              },

              body:
                JSON.stringify(
                  newProperty
                )

            }

          );

        const data =
          await response.json();

        if (response.ok) {

          // Clear Form

          setTitle("");
          setPrice("");
          setLocation("");
          setBeds("");
          setBaths("");
          setImage("");
          setDescription("");
          setType("");

          //Close form
          setShowForm(false);

          //Reload Properties

          window.location.reload();

          // Hide Form

          setShowForm(false);

        }

        else {

          setError(
            data.message
          );

        }

      }

      catch (error) {

        console.log(error);

        setError(
          "Something went wrong"
        );

      }

      setLoading(false);

    };

  return (

    <div className="add-property-container">

      {/* Button */}

      <button

        className="add-btn"

        onClick={() =>

          setShowForm(
            !showForm
          )

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

          onSubmit={
            handleSubmit
          }

        >

          <h2>
            Add Property
          </h2>

          <input

            type="text"

            placeholder="Title"

            value={title}

            onChange={(e) =>

              setTitle(
                e.target.value
              )

            }

          />

          <input

            type="text"

            placeholder="Price"

            value={price}

            onChange={(e) =>

              setPrice(
                e.target.value
              )

            }

          />

          <input

            type="text"

            placeholder="Location"

            value={location}

            onChange={(e) =>

              setLocation(
                e.target.value
              )

            }

          />

          <input

            type="number"

            className="number-field"

            placeholder="Bedrooms"

            min="0"

            value={beds}

            onChange={(e) =>

              setBeds(
                e.target.value
              )

            }

          />

          <input

            type="number"

            className="number-field"

            placeholder="Bathrooms"

            min="0"

            value={baths}

            onChange={(e) =>

              setBaths(
                e.target.value
              )

            }

          />

          <input

            type="text"

            placeholder="Image URL"

            value={image}

            onChange={(e) =>

              setImage(
                e.target.value
              )

            }

          />

          <select

            value={type}

            onChange={(e) =>

              setType(
                e.target.value
              )

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

          {/* Error */}

          {error && (

            <div className="error-box">

              <h3>
                ⚠ {error}
              </h3>

            </div>

          )}

          {/* Loading */}

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