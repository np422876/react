import React,
{
  useEffect,
  useState
} from "react";

import Propertycard
from "./Propertycard";

function Save() {

  const [favorites,
    setFavorites] =
    useState([]);

  useEffect(() => {

    fetchFavorites();

  }, []);

  const fetchFavorites =
    async () => {

      try {

        const token =

          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(

            "http://localhost:8000/api/user/favorites",

            {

              headers: {

                Authorization:
                  `Bearer ${token}`

              }

            }

          );

        const data =
          await response.json();

        setFavorites(data);

      }

      catch (error) {

        console.log(error);

      }

    };

  const handleSave =
    async (propertyId) => {

      try {

        const token =

          localStorage.getItem(
            "token"
          );

        await fetch(

          `http://localhost:8000/api/user/favorite/${propertyId}`,

          {

            method: "POST",

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }

        );

        fetchFavorites();

      }

      catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="saved-page">

      

      

        {favorites.length === 0 ? (

         <div className="save">
          <h2 >
            No Saved Properties
          </h2>
          <h4>Save Properties to see them here</h4>
          </div>

        ) : (

          favorites.map(

            (property) => (

              <Propertycard

                key={property._id}

                property={property}

                handleSave={() =>

                  handleSave(
                    property.id
                  )

                }

                isSaved={true}

              />

            )

          )

        )}

      </div>

   

  );

}

export default Save;