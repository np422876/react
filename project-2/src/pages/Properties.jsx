import React, { useState, useEffect } from "react";
import Propertycard from "../components/Propertycard";
import "./Properties.css";
function Properties({
  savedProperties,
  handleSave
}) {
  const [properties, setProperties] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");
    console.log("savedProperties:", savedProperties);

  // Fetch Properties

  useEffect(() => {

    setLoading(true);

    setTimeout(() => {

      fetch(
        "http://localhost:8000/api/properties"
      )

        .then((res) => res.json())

        .then((apiData) => {
          setProperties(apiData);
        

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


  return (

    <div>

      {/* Skeleton Loader */}

      {loading ? (

        <div className="skeleton-container">

          <div className="skeleton-card"></div>

          <div className="skeleton-card"></div>

          <div className="skeleton-card"></div>

        </div>

      ) : error ? (

        /* Error State */

        <div className="error-box">

          <h2>
            ⚠ {error}
          </h2>

          <p>
            Please try again later
          </p>

        </div>

      ) : (

        <div className="property-grid">

          {/* No Properties Found */}

          {properties.length === 0 ? (

            <div className="no-properties">

              <h2>
                No properties found
              </h2>

              <p>
                Add a property to see it here
              </p>

            </div>

          ) : (

            properties.map((property) => (

              <Propertycard
                key={property._id}
                property={property}
                handleSave={handleSave}
                
                isSaved={savedProperties.some((p) => p._id === property._id)}
              />

            ))

          )}

        </div>

      )}

    </div>

  );

}

export default Properties;