import React, {useState} from 'react'
import "./Save.css";

const Save = () => {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(!saved);
    };
  return (
    <button onClick={handleSave}
      id={saved ? "saved-btn" : "btn"}>    
        {saved ? "Saved❤️" : "Save❤️"}
    </button>
  )
}

export default Save