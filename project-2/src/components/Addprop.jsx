import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Addprop.css";

function Addprop({closeform}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    beds: "",
    baths: "",
    image: "",
    description: "",
    type: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const token =
      localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8000/api/properties",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      }
    );

    const data =
      await response.json();

    console.log(
      "SERVER RESPONSE:",
      data
    );

    if (response.ok) {

      alert(
        "Property added successfully"
      );

      window.location.reload();

    } else {

      alert(
        data.message ||
        "Failed to add property"
      );

    }

  } catch (error) {

    console.log(error);

    alert(
      "Something went wrong"
    );

  }
};

  return (
    <div className="edit-container">

      <h1>
        Add Property
      </h1>

      <form
        className="edit-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="title"
          placeholder="Property Title"
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

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
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
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        
        <button
  type="submit"
  className="update-btn">
  Add Property
</button>

        
      </form>

    </div>
  );
}

export default Addprop;