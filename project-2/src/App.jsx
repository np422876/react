import React, {useState,useEffect,useContext} from 'react'

import {BrowserRouter,Routes, Route} from 'react-router-dom'

import { PropertyContext } from "./context/PropertyContext"

import Home from './pages/Home'
import Properties from './pages/Properties'
import About from './pages/About'
import Saved from './pages/Saved'
import PropertyDetails from "./pages/PropertyDetails";

import Navbar from './components/Navbar'
import Propertycard from './components/Propertycard'

import "./App.css"
import "./components/Navbar.css"
import "./components/Save.css"

function App() {

  // Context
  const {
    properties,
    setProperties
  } = useContext(PropertyContext)

  // States
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  // Search
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  // Saved to localStorage
  useEffect(() => {

    localStorage.setItem(
      "properties",
      JSON.stringify(properties)
    )

  }, [properties])

  // Fetch properties
  useEffect(() => {

    setTimeout(() => {

      fetch(
        "https://6a0417582afe8349b4b5d8e5.mockapi.io/api/properties"
      )

        .then((response) => {

          if (!response.ok) {
            throw new Error(
              "Failed to fetch properties"
            )
          }

          return response.json()

        })

        .then((data) => {

          const savedProperties =
            JSON.parse(
              localStorage.getItem("properties")
            ) || []

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

  // Filters
  const filteredProperties =
    properties.filter((property) => {

      const matchesSearch =
        property.title
          ?.toLowerCase()
          .includes(search.toLowerCase())

      const matchesType =
        typeFilter === "" ||

        property.type
          ?.trim()
          .toLowerCase() ===

        typeFilter
          .trim()
          .toLowerCase()

      const matchesPrice =

        maxPrice === "" ||

        Number(
          String(property.price)
            .replace(/[^0-9]/g, "")
        )

        <= Number(maxPrice)

      return (
        matchesSearch &&
        matchesType &&
        matchesPrice
      )

    })

  return (

    <BrowserRouter>

      <Navbar />

      <div className="filters">

        <input
          type="text"
          placeholder="Search by title"
          value={search}
          className="searchbox"
          onChange={handleSearch}
        />

        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value)
          }
        >

          <option value="">
            All Types
          </option>

          <option value="Apartment">
            Apartment
          </option>

          <option value="Bunglow">
            Bunglow
          </option>

          <option value="Studio">
            Studio
          </option>

          <option value="Villa">
            Villa
          </option>

          <option value="Mansion">
            Mansion
          </option>

          <option value="Flat">
            Flat
          </option>

        </select>

        <input
          type="number"
          placeholder="Max Price"
          min={0}
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value)
          }
        />

      </div>

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

                <Home />

                <div className="user">

                  {filteredProperties.map(
                    (property) => (

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

                    )
                  )}

                </div>

              </div>

            )

          }
        />

        <Route
          path="/"
          element={<Properties/>}
        />

        <Route
          path="/properties/:id"
          element={<PropertyDetails />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/saved"
          element={<Saved />}
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App