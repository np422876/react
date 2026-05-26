import React, { useState, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Save from "./components/Save";
import PropertyDetails from "./pages/PropertyDetails";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Navbar from "./components/Navbar";
import Propertycard from "./components/Propertycard";
import Propertymodal from "./components/Propertymodal";

import "./App.css";
import "./components/Navbar.css";
import "./components/Save.css";

function App() {

  // Loading State

  const [loading, setLoading] =
    useState(true);

  // Error State

  const [error, setError] =
    useState("");

  // Search State

  const [search, setSearch] =
    useState("");

  // Filters

  const [typeFilter, setTypeFilter] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  // Properties

  const [properties, setProperties] =
    useState([]);

  // Saved Properties

  const [savedProperties,
    setSavedProperties] =
    useState([]);

  // Modal

  const [selectedProperty,
    setSelectedProperty] =
    useState(null);

  // Login State

  const [isLoggedIn,
    setIsLoggedIn] =
    useState(false);

  // Save / Unsave Property

  const handleSave = (property) => {

    const alreadySaved =
      savedProperties.find(
        (item) =>
          item.id === property.id
      );

    let updatedSaved;

    if (alreadySaved) {

      updatedSaved =
        savedProperties.filter(
          (item) =>
            item.id !== property.id
        );

    } else {

      updatedSaved = [
        ...savedProperties,
        property
      ];

    }

    setSavedProperties(updatedSaved);

    localStorage.setItem(
      "savedProperties",
      JSON.stringify(updatedSaved)
    );

  };

  // Search

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Fetch Properties

  useEffect(() => {

    // Login Status

    const loginStatus =
      localStorage.getItem(
        "isLoggedIn"
      );

    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }

    // Saved Properties

    const savedData =
      JSON.parse(
        localStorage.getItem(
          "savedProperties"
        )
      ) || [];

    setSavedProperties(savedData);

    setLoading(true);

    setTimeout(() => {

      fetch(
        "https://6a0417582afe8349b4b5d8e5.mockapi.io/api/properties"
      )

        .then((res) => res.json())

        .then((apiData) => {

          // Local Added Properties

          const localData =
            JSON.parse(
              localStorage.getItem(
                "properties"
              )
            ) || [];

          // Merge API + Local

          const mergedProperties = [

            ...apiData,

            ...localData.filter(
              (localProperty) =>

                !apiData.some(
                  (apiProperty) =>

                    apiProperty.id ===
                    localProperty.id
                )
            )

          ];

          setProperties(
            mergedProperties
          );

          setLoading(false);

        })

        .catch(() => {

          setError(
            "Failed to load properties"
          );

          setLoading(false);

        });

    }, 3000);

  }, []);

  // Filtered Properties

  const filteredProperties =
    properties.filter((property) => {

      return (

        property.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) &&

        (
          typeFilter === "" ||

          property.type
            ?.toLowerCase() ===
          typeFilter.toLowerCase()
        ) &&

        (
          maxPrice === "" ||

          Number(
            String(property.price)
              .replace(/[^0-9]/g, "")
          ) <= Number(maxPrice)
        )

      );

    });

  return (

    <BrowserRouter>

      {!isLoggedIn ? (

        // AUTH PAGES

        <Routes>

          <Route
            path="/"
            element={
              <Login
                setIsLoggedIn={
                  setIsLoggedIn
                }
              />
            }
          />

          <Route
            path="/signup"
            element={
              <Signup
                setIsLoggedIn={
                  setIsLoggedIn
                }
              />
            }
          />

        </Routes>

      ) : (

        // WEBSITE

        <>

          <Navbar />

          {/* Filters */}

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

                  // Skeleton Loader

                  <div className="skeleton-container">

                    <div className="skeleton-card"></div>

                    <div className="skeleton-card"></div>

                    <div className="skeleton-card"></div>

                  </div>

                ) : error ? (

                  // Error State

                  <div className="error-box">

                    <h2>
                      ⚠ {error}
                    </h2>

                    <p>
                      Please try again later
                    </p>

                  </div>

                ) : (

                  <div>

                    <Home />

                    <div className="user">

                      {filteredProperties.length === 0 ? (

                        <div className="no-properties">

                          <h2>
                            No properties found
                          </h2>

                          <p>
                            Try changing your filters
                          </p>

                        </div>

                      ) : (

                        filteredProperties.map(
                          (property) => (

                            <Propertycard
                              key={property.id}
                              property={property}
                              handleSave={handleSave}
                              onCardClick={
                                setSelectedProperty
                              }
                              isSaved={savedProperties.some(
                                (item) =>
                                  item.id === property.id
                              )}
                            />

                          )
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
              element={
                <Properties
                  savedProperties={
                    savedProperties
                  }
                  handleSave={handleSave}
                />
              }
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/saved"
              element={
                <Save
                  savedProperties={
                    savedProperties
                  }
                  handleSave={handleSave}
                />
              }
            />

          </Routes>

          {/* Modal */}

          <Propertymodal
            property={selectedProperty}
            onClose={() =>
              setSelectedProperty(null)
            }
          />

        </>

      )}

    </BrowserRouter>

  );

}

export default App;