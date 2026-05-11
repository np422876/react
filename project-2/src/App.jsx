import React, {useState} from 'react'
import Propertycard from "./components/Propertycard";
import img from "./assets/apartment.png";
import "./App.css"; 
import Save from "./components/Save";
import "./components/Save.css";
import Navbar from "./components/Navbar";
import "./components/Navbar.css";

function App() {
  const handleSearch = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className='user'>
      <Navbar/>
      <input type="text" placeholder='Search properties...' onChange={handleSearch} className='search-input'/>
      <Propertycard 
        title="Luxury Apartment"
        price="75,00,00"
        location="Ahmedabad, Gujarat"
        beds={3}
        baths={2}
        image={img}
        Save={<Save />}
      />  
      <Propertycard
        title="Modern Villa"
        price="65,00,00"
        location="Mumbai, Maharashtra"
        beds={4}
        baths={3}
        image={img}
        Save={<Save />}
      />
      <Propertycard
        title="Cozy Cottage"
        price="45,00,00"
        location="Noida, Uttar Pradesh"
        beds={2}
        baths={1}
        image={img}
        Save={<Save />}
      />
    </div>
  )
}

export default App
