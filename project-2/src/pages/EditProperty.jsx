import React, {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import "./EditProperty.css";

function EditProperty() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({

      title: "",

      price: "",

      location: "",

      beds: "",

      baths: "",

      image: "",

      description: ""

    });

  // Fetch Property

  useEffect(() => {

    const fetchProperty =
      async () => {

        try {

          const response =
            await fetch(

              `http://localhost:8000/api/properties/${id}`

            );

          const data =
            await response.json();

          setFormData(data);

        }

        catch (error) {

          console.log(error);

        }

      };

    fetchProperty();

  }, [id]);

  // Handle Change

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };

  // Update Property

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(

            `http://localhost:8000/api/properties/${id}`,

            {

              method: "PUT",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`

              },

              body: JSON.stringify(
                formData
              )

            }

          );

        if (response.ok) {

  alert("Property updated successfully");

  window.location.href = "/";

}

        else {

          alert(
            "Failed to update property"
          );

        }

      }

      catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="edit-container">

      <h1>
        Edit Property
      </h1>

      <form
        className="edit-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="beds"
          placeholder="Bedrooms"
          value={formData.beds}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="baths"
          placeholder="Bathrooms"
          value={formData.baths}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="update-btn"
        >
          Update Property
        </button>

      </form>

    </div>

  );

}

export default EditProperty;