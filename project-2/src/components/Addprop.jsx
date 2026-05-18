import React, { useState } from "react";
import "./AddProp.css";

const AddProp = ({ properties, setProperties }) => {

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    type: "",
    beds: "",
    baths: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

  e.preventDefault();

  const newProperty = {
    id: Date.now(),
    ...formData
  };

  setProperties([...properties, newProperty]);

  console.log(newProperty);

};
  return (
    <form className="form" onSubmit={handleSubmit}>

      <input type="text" name="title" placeholder="Property Title" onChange={handleChange} />

      <input type="text" name="price" placeholder="Price" onChange={handleChange} />

      <input type="text"  name="location" placeholder="Location" onChange={handleChange} />

      <input type="text" name="type" placeholder="Property Type" onChange={handleChange} />

      <input type="number" name="beds" placeholder="Beds" onChange={handleChange} />

      <input type="number" name="baths" placeholder="Baths" onChange={handleChange} />

      <textarea name="description"  placeholder="Description" onChange={handleChange}></textarea>

      <button type="submit"> 
        Add Property
      </button>

    </form>
  );
};

export default AddProp