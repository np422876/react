import React from "react";

import Propertycard
from "../components/Propertycard";

function Save({
  savedProperties,
  handleSave
}) {

  return (

    <div className="user">

      {savedProperties.length === 0 ? (

        <h2>
          No Saved Properties
        </h2>

      ) : (

        savedProperties.map(
          (property) => (

            <Propertycard
              key={property.id}
              property={property}
              handleSave={
                handleSave
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