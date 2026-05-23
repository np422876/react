import React, { useContext } from 'react'

import "./Save.css"

import { PropertyContext }
from '../context/PropertyContext'

const Save = ({ property }) => {

  const {
    savedProperties,
    setSavedProperties
  } = useContext(PropertyContext)

  // Check if already saved
  const isSaved = savedProperties.some(
    (item) => item.id === property.id
  )

  const handleSave = () => {

    if (isSaved) {

      // Remove from saved
      const updatedProperties =
        savedProperties.filter(
          (item) => item.id !== property.id
        )

      setSavedProperties(updatedProperties)

    } else {

      // Add to saved
      setSavedProperties([
        ...savedProperties,
        property
      ])

    }

  }

  return (

    <button
      onClick={handleSave}
      id={isSaved ? "saved-btn" : "btn"}
    >

      {isSaved ? "Saved❤️" : "Save❤️"}

    </button>

  )
}

export default Save