import React,
{
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

function PropertyDetails() {

  const { id } =
    useParams();

  const [property,
    setProperty] =
    useState(null);

  useEffect(() => {

    fetch(

      `${import.meta.env.VITE_API_URL}/api/properties/${id}`

    )

      .then((res) =>
        res.json()
      )

      .then((data) => {

        setProperty(data);

      })

      .catch((error) => {

        console.log(error);

      });

  }, [id]);

  if (!property) {

    return <h2>Loading...</h2>;

  }

  return (

    <div>

      <img
        src={property.image}
        alt={property.title}
        width="300"
      />

      <h1>
        {property.title}
      </h1>

      <h3>
        {property.price}
      </h3>

      <p>
        {property.location}
      </p>

      <p>
        Bedrooms:
        {" "}
        {property.beds}
      </p>

      <p>
        Bathrooms:
        {" "}
        {property.baths}
      </p>

      <p>
        {property.description}
      </p>

    </div>

  );

}

export default PropertyDetails;