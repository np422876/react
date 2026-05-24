import React, {
  useState,
  useEffect,
  useContext
} from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { PropertyContext }
from "./context/PropertyContext";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Saved from "./pages/Saved";
import PropertyDetails from "./pages/PropertyDetails";

import Navbar from "./components/Navbar";
import Propertycard from "./components/Propertycard";

import "./App.css";
import "./components/Navbar.css";
import "./components/Save.css";

function App() {

  const {
    properties,
    setProperties,
    savedProperties,
    setSavedProperties
  } = useContext(PropertyContext);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  // Save / Unsave
  const handleSave = (property) => {

    const alreadySaved =
      savedProperties.find(
        (item) =>
          item.id === property.id
      );

    if (alreadySaved) {

      setSavedProperties(

        savedProperties.filter(
          (item) =>
            item.id !== property.id
        )

      );

    } else {

      setSavedProperties([
        ...savedProperties,
        property
      ]);

    }

  };

  // Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // LocalStorage
  useEffect(() => {

    localStorage.setItem(
      "savedProperties",
      JSON.stringify(savedProperties)
    );

  }, [savedProperties]);

  // Fetch Properties
  useEffect(() => {

    fetch(
      "https://6a0417582afe8349b4b5d8e5.mockapi.io/api/properties"
    )

      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Failed to fetch properties"
          );
        }

        return response.json();

      })

      .then((data) => {

        setProperties(data);

        const storedSaved =
          JSON.parse(
            localStorage.getItem(
              "savedProperties"
            )
          ) || [];

        setSavedProperties(storedSaved);

        setLoading(false);

      })

      .catch((err) => {

        setError(err.message);
        setLoading(false);

      });

  }, []);

  // Filters
  const filteredProperties =
    properties.filter((property) => {

      const matchesSearch =
        property.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesType =

        typeFilter === "" ||

        property.type
          ?.toLowerCase()
          ===
        typeFilter.toLowerCase();

      const matchesPrice =

        maxPrice === "" ||

        Number(
          String(property.price)
            .replace(/[^0-9]/g, "")
        )

        <= Number(maxPrice);

      return (

        matchesSearch &&
        matchesType &&
        matchesPrice

      );

    });

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
            setTypeFilter(
              e.target.value
            )
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
            setMaxPrice(
              e.target.value
            )
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
                        property={property}
                        handleSave={
                          handleSave
                        }
                        isSaved={
                          savedProperties.some(
                            (item) =>
                              item.id ===
                              property.id
                          )
                        }
                      />

                    )
                  )}

                </div>

              </div>

            )

          }
        />

        <Route
          path="/properties/:id"
          element={
            <PropertyDetails />
          }
        />

        <Route
          path="/properties"
          element={<Properties />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/saved"
          element={
            <Saved
              savedProperties={
                savedProperties
              }
              handleSave={
                handleSave
              }
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;