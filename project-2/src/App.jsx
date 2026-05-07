import React from 'react'
import PropertyCard from './components/Propertycard.jsx'
import './App.css'

function App() {
 

  return (
    <div className='user'>
      <PropertyCard
        title="Luxury Apartment"
        price="75,00,00"
        location="Ahmedabad, Gujarat"
        beds={2}
        baths={1}
        image=""
      />
      <PropertyCard
        title="Cozy Cottage"
        price="45,00,00"
        location="Noida, Uttar Pradesh"
        beds={3}
        baths={2}
        image=""
      />
      <PropertyCard
        title="Spacious Suburban Home"
        price="65,00,00"
        location="Mumbai, Maharashtra"
        beds={4}
        baths={3}
        image=""
      />
    </div>
  )
}

export default App
