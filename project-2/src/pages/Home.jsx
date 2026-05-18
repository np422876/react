import React from "react";
import Addprop from "../components/Addprop";

function Home({ properties, setProperties }) {

  return (

    <div>

      <Addprop
        properties={properties}
        setProperties={setProperties}
      />

    </div>

  );
}

export default Home;