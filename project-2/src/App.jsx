import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Properties from './pages/Properties'
import About from './pages/About'

import Navbar from './components/Navbar'
import Propertycard from './components/Propertycard'

import "./App.css"
import "./components/Navbar.css"
import "./components/Save.css"

function App() {

  const handleSearch = (e) => {
    console.log(e.target.value)
  }

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {

    setTimeout(() => {

      fetch("https://6a0417582afe8349b4b5d8e5.mockapi.io/api/properties")

        .then((response) => {

          if (!response.ok) {
            throw new Error("Failed to fetch properties")
          }

          return response.json()
        })

        .then((data) => {
          setProperties(data)
          setLoading(false)
        })

        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })

    }, 1000)

  }, [])

  return (
    <BrowserRouter>

      <Navbar>
       <input type="text" placeholder="Search properties..." className="searchbox" onChange={handleSearch}/>
      </Navbar> 
      <Routes>

       <Route path="/properties/:id" element={<Properties />} />
        
        <Route
          path="/" element={ loading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : error ? (
              <h2>{error}</h2>
            ) : (
              
              <div className="user">
                {properties.map((property) => (
                  console.log(property),
                  <Propertycard
                    key={property.id}
                    id={property.id}
                    title={property.title}
                    price={property.price}
                    location={property.location}
                    beds={property.beds}
                    baths={property.baths}
                    image={property.image}
                  />
                ))}
              </div>
            )
          }
        />

        <Route path="/properties" element={<Properties />} />

        <Route path="/about" element={<About />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App