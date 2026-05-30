import React, {
  useState,
  useEffect
} from "react";

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
import EditProperty from "./pages/EditProperty";
import Addprop from "./components/Addprop";

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

  // Favorites

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

  // =========================
  // FETCH PROPERTIES
  // =========================

  useEffect(() => {

    fetch(
      `${import.meta.env.VITE_API_URL}/api/properties`
    )

      .then((res) => res.json())

      .then((data) => {

        setProperties(data);

        setLoading(false);

      })

      .catch(() => {

        setError(
          "Failed to load properties"
        );

        setLoading(false);

      });

  }, []);

  // =========================
  // LOGIN CHECK
  // =========================

  useEffect(() => {

    const loginStatus =
      localStorage.getItem(
        "isLoggedIn"
      );

    if (loginStatus === "true") {

      setIsLoggedIn(true);

    }

  }, []);

  // =========================
  // FETCH FAVORITES
  // =========================

  useEffect(() => {

  const fetchFavorites = async () => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) return;

      const response = await fetch(
        "http://localhost:8000/api/user/favorites",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      console.log(
        "FAVORITES:",
        data
      );

      setSavedProperties(
        Array.isArray(data)
          ? data
          : []
      );

    }

    catch (error) {

      console.log(error);

    }

  };

  fetchFavorites();

}, []);

  // SAVE / UNSAVE PROPERTY

  const handleSave = async (property) => {

  console.log("PROPERTY:", property);

  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (!token) {

    alert("Please login again");

    return;

  }

  try {

    const response = await fetch(

      `http://localhost:8000/api/user/favorite/${property._id}`,

      {

        method: "POST",

        headers: {

          Authorization: `Bearer ${token}`

        }

      }

    );

    const result = await response.json();

    console.log(result);

    const favoritesResponse = await fetch(

      "http://localhost:8000/api/user/favorites",

      {

        headers: {

          Authorization: `Bearer ${token}`

        }

      }

    );

    const favoritesData =
      await favoritesResponse.json();

    setSavedProperties(

      Array.isArray(favoritesData)

        ? favoritesData

        : []

    );

  }

  catch (error) {

    console.log(error);

  }

};

  // SEARCH
  
  const handleSearch = (e) => {

    setSearch(
      e.target.value
    );

  };

  // =========================
  // FILTERED PROPERTIES
  // =========================

  const filteredProperties =
    properties.filter((property) => {

      return (

        property.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        &&

        (

          typeFilter === ""

          ||

          property.type
            ?.toLowerCase()

          ===

          typeFilter.toLowerCase()

        )

        &&

        (

          maxPrice === ""

          ||

          Number(

            String(property.price)
              .replace(/[^0-9]/g, "")

          )

          <=

          Number(maxPrice)

        )

      );

    });

  return (

    <BrowserRouter>

      {!isLoggedIn ? (

        // =========================
        // AUTH PAGES
        // =========================

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

          <Route
  path="/edit-property/:id"
  element={<EditProperty />}
/>

        </Routes>

      ) : (

        // =========================
        // WEBSITE
        // =========================

        <>

          <Navbar />

          {/* FILTERS */}

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

            {/* HOME */}

            <Route

              path="/"

              element={

                loading ? (

                  <div className="skeleton-container">

                    <div className="skeleton-card"></div>

                    <div className="skeleton-card"></div>

                    <div className="skeleton-card"></div>

                  </div>

                ) : error ? (

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

                              key={property._id}

                              property={property}

                              handleSave={handleSave}

                              onCardClick={
                                setSelectedProperty
                              }

                              isSaved={savedProperties.some(

                                (item) =>

                                  item._id ===
                                  property._id

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

            {/* PROPERTY DETAILS */}

            <Route

              path="/properties/:id"

              element={
                <PropertyDetails />
              }

            />

            {/* PROPERTIES */}

            <Route

              path="/properties"

              element={

                <Properties
                  handleSave={
                    handleSave
                  }
                />

              }

            />

            {/* ABOUT */}

            <Route

              path="/about"

              element={<About />}

            />

            {/* SAVED */}

            <Route

              path="/saved"

              element={<Save />}

            />

            {/* ADD PROPERTY */}

            <Route

              path="/add-property"

              element={

                isLoggedIn

                  ? <Addprop />

                  : <Login
                      setIsLoggedIn={
                        setIsLoggedIn
                      }
                    />

              }

            />

          </Routes>

          {/* MODAL */}

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

export default App