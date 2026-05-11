import React from "react";
import "./Navbar.css";
import img from "../assets/realestate-removebg-preview.png";

function Navbar() {
  return (
    <div className="navbar">
        <h1 className="logo">
            <img src={img} alt="Logo" className="logo" />
        </h1>
        <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#properties">Properties</a>
            <a href="#contact">Contact</a>
        </div>
    </div>
  )
}

export default Navbar
