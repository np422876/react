import React, {
  useContext
} from 'react'

import { useParams } from 'react-router-dom'

import { PropertyContext }
from '../context/PropertyContext'

const Properties = () => {

  const { properties } =
    useContext(PropertyContext)

  const { id } = useParams()

  // Find selected property
  const property = properties.find(
    (item) => item.id == id
  )

  // Loading check
  if (!property) {
    return <h1>Loading...</h1>
  }

  return (

    <div className='properties'>

      <img
        src={property.image}
        alt={property.title}
        width="300"
      />

      <h1>{property.title}</h1>

      <h2>{property.price}</h2>

      <p>{property.location}</p>

      <p>
        {property.beds} Bedrooms
      </p>

      <p>
        {property.baths} Bathrooms
      </p>

      <p>{property.description}</p>

    </div>

  )
}

export default Properties