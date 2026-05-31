import React, {useState,useEffect,useMemo,lazy,Suspense} from "react";
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Save from "./components/Save";

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

import useFetch from "./hooks/useFetch";
import useAuth from "./hooks/useAuth";

function App() {

  // Search State

  const [search, setSearch] =
    useState("");

  // Filters

  const [typeFilter, setTypeFilter] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  // Favorites

  const [savedProperties,
    setSavedProperties] =
    useState([]);


  // Modal

  const [selectedProperty,
    setSelectedProperty] =
    useState(null);

    const [showAddForm, setShowAddForm] =
  useState(false);

  const PropertyDetails = lazy(
  () =>
    import(
      "./pages/PropertyDetails"
    )
);

    const {

  data: properties,

  loading,

  error,

  setData: setProperties

} = useFetch(

  `${import.meta.env.VITE_API_URL}/api/properties`

);

  const {
  isLoggedIn,
  setIsLoggedIn
} = useAuth();
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
  useMemo(() => {

    return properties.filter(
      (property) => {

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

      }

    );

  }, [

    properties,

    search,

    typeFilter,

    maxPrice

  ]);

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

            <button
             className="add-btn"
             onClick={() =>
             setShowAddForm(!showAddForm)
              } 
             >
             {showAddForm
              ? "Close Form"
             : "Add Property"}
            </button>

             </div>

{showAddForm && (
  <Addprop
    closeForm={() =>
      setShowAddForm(false)
    }
  />
)}
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
    <Suspense
      fallback={
        <h2>
          Loading Property...
        </h2>
      }
    >
      <PropertyDetails />
    </Suspense>
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

            <Route
    path="/edit-property/:id"
    element={<EditProperty />}
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