import React, {useState} from 'react'
import Propertycard from "./components/Propertycard";
import img from "./assets/apartment.png";
import "./App.css"; 
import Save from "./components/Save";
import "./components/Save.css";

function App() {
 return (
    <div className='user'>
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
