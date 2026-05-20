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
    setSearch(e.target.value)
  }

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [properties, setProperties] = useState(() => {
  

    const savedProperties =
      localStorage.getItem("properties");

    return savedProperties
      ? JSON.parse(savedProperties)
      : [];
  });

  useEffect(() => {

    localStorage.setItem(
      "properties",
      JSON.stringify(properties)
    );

  }, [properties]);

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
          const savedProperties =
    JSON.parse(localStorage.getItem("properties")) || [];

  if (savedProperties.length > 0) {
    setProperties(savedProperties)
  } else {
    setProperties(data)
  }

  setLoading(false)

})

        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })

    }, 1000)

  }, [])

  const filteredProperties = properties.filter((property) => {

  const matchesSearch =
    property.title
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesType =
    typeFilter === "" ||
    property.type === typeFilter;

  const matchesPrice =
    maxPrice === "" ||
    Number(property.price) <= Number(maxPrice);

  return (
    matchesSearch &&
    matchesType &&
    matchesPrice
  );

});

  return (

    <BrowserRouter>

      <Navbar>
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          className="searchbox"
          onChange={handleSearch}
        />
        <select
    value={typeFilter}
    onChange={(e) => setTypeFilter(e.target.value)}
  >

    <option value="">All Types</option>
    <option value="Apartment">Apartment</option>
    <option value="Villa">Villa</option>
    <option value="Studio">Studio</option>

  </select>

  <input
    type="number"
    placeholder="Max Price"
    min={0}
    value={maxPrice}
    onChange={(e) => setMaxPrice(e.target.value)}
  />


      </Navbar>

      <Routes>

        <Route
          path="/"
          element={

            loading ? (

              <div className="loading">
                <div className="spinner"></div>
              </div>

            ) : error ? (

              <h2>{error}</h2>

            ) : (

              <div>

                <Home
                  properties={properties}
                  setProperties={setProperties}
                />

                <div className="user">

                  {filteredProperties.map((property) => (

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

              </div>

            )

          }
        />

        <Route
          path="/properties"
          element={<Properties />}
        />

        <Route
          path="/properties/:id"
          element={<Properties />}
        />

        <Route
          path="/about"
          element={<About />}
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App