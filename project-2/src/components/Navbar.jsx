import React from "react";
import "./Navbar.css";
import img from "../assets/realestate-removebg-preview.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
        <h1 className="logo">
            <img src={img} alt="Logo" className="logo" />
        </h1>
        <div className="nav-links">
            <Link to="/">Home</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/about">About</Link>
        </div>
    </div>
  )
}

export default Navbar
