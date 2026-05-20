import React, { useState } from "react";

import "./Addprop.css";

const Addprop = ({ properties, setProperties }) => {

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    type: "",
    beds: "",
    baths: "",
    description: ""
  });

  

 const isFormValid =
  formData.title.trim() !== "" &&
  formData.price.trim() !== "" &&
  formData.location.trim() !== "" &&
  formData.type.trim() !== "" &&
  formData.beds !== "" &&
  formData.baths !== "" &&
  formData.description.trim() !== "";
  

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {
    if (formData.beds < 0 || formData.baths < 0) {
      alert("Bedrooms and Bathrooms cannot be negative.");
      return;
    }

    e.preventDefault();

    const newProperty = {
      id: Date.now(),
      image: "https://via.placeholder.com/300",
      ...formData
    };

    setProperties([...properties, newProperty]);

    setFormData({
      title: "",
      price: "",
      location: "",
      type: "",
      beds: "",
      baths: "",
      description: ""
    });

    setShowForm(false);

  };

  return (

    <div>

      <button className="add-btn" onClick={() => setShowForm(true)} >
        Add Property
      </button>

      {showForm && (

        <form className="form" onSubmit={handleSubmit}>

          <input type="text"
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
            type="text"
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="beds"
            placeholder="Beds"
            min={0}
            value={formData.beds}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="baths"
            placeholder="Baths"
            min={0}
            value={formData.baths}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">
            Add Property
          </button>

        </form>

      )}

    </div>


  );
};

export default Addprop;