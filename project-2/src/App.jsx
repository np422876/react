import React, {useState} from 'react'
import Propertycard from "./components/Propertycard";
import img from "./assets/apartment.png";
import img2 from "./assets/realestate-removebg-preview.png";
import "./App.css"; 
import Save from "./components/Save";
import "./components/Save.css";
import Navbar from "./components/Navbar";
import "./components/Navbar.css";
import Properties from "./components/Properties.js";
import { useEffect } from 'react';

function App() {
  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading">
  <div className="spinner"></div>
</div>
      ) : (
        <div className='navbar'>
          <Navbar />
          <input type="text" placeholder='Search properties...' className='searchbox' onChange={handleSearch} />
      

      <div className='user'>
      {Properties.map((property) => (
        <Propertycard
          key={property.id}
          title={property.title}
          price={property.price}
          location={property.location}
          beds={property.bedrooms}
          baths={property.bathrooms}
          image={property.Image}
        />
      ))}
      </div>
      </div>
      )}
      </div>
  )
}

export default App
