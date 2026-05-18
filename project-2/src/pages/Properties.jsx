import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Properties = () => {

  const { id } = useParams()

  const [property, setProperty] = useState(null)

  useEffect(() => {

    fetch("https://6a0417582afe8349b4b5d8e5.mockapi.io/api/properties")

      .then((response) => response.json())

      .then((data) => {

        const selectedProperty = data.find(
          (item) => item.id == id
        )

        setProperty(selectedProperty)
      })

  }, [id])

  if (!property) {
    return <h1>Loading...</h1>
  }

  return (

    <div className='properties'>

      <img src={property.image} alt={property.title} width="300" />

      <h1>{property.title}</h1>

      <h2>{property.price}</h2>

      <p>{property.location}</p>

      <p>{property.beds} Bedrooms</p>

      <p>{property.baths} Bathrooms</p>

      <p>{property.description}</p>

    </div>
  )
}

export default Properties