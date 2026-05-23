import { createContext, useState } from "react";

export const PropertyContext = createContext();

function PropertyProvider({ children }) {

  const [properties, setProperties] = useState([]);

 
  const [savedProperties, setSavedProperties] = useState([]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        setProperties,
        savedProperties,
        setSavedProperties
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export default PropertyProvider;