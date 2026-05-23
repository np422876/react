import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function PropertyDetails() {

  const { id } = useParams();

  const [property, setProperty] = useState(null);

  useEffect(() => {

    fetch(
      `https://6a0417582afe8349b4b5d8e5.mockapi.io/api/properties/${id}`
    )
      .then((res) => res.json())
      .then((data) => {

        console.log(data);

        setProperty(data);

      })

      

  }, [id]);

  if (!property) {
    return <h1>Loading...</h1>;
  }

  return (

    <div>

      <img
        src={property.image}
        width="400"
        alt={property.title}
        
      />

      <h1>{property.title}</h1>

      <h2>
        {property.price}
      </h2>

      <p>{property.location}</p>

      <p>
        Bedrooms: {property.beds}
      </p>

      <p>
        Bathrooms: {property.baths}
      </p>

      <p>{property.description}</p>

    </div>

  );
}

export default PropertyDetails;