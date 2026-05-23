import React, { useContext } from "react"

import { PropertyContext }
from "../context/PropertyContext"

const Saved = () => {

  const { savedProperties } =
    useContext(PropertyContext)

  return (

    <div className="user">

      {savedProperties.length === 0 ? (

        <h2>No saved properties</h2>

      ) : (

        savedProperties.map((property) => (

          <div
            key={property.id}
            className="container"
          >

            <img
              src={property.image}
              alt={property.title}
              width="200"
            />

            <h2>{property.title}</h2>

            <p>{property.price}</p>

            <p>{property.location}</p>

          </div>

        ))

      )}

    </div>

  )
}

export default Saved