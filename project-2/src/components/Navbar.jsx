import React from "react";
import "./Navbar.css";
import img from "../assets/realestate-removebg-preview.png";
import { Link } from "react-router-dom";

function Navbar({children}) {
  const userName =
  localStorage.getItem(
    "userName"
  );
  return (
    <div className="navbar">
        <h1 className="logo">
            <img src={img} alt="Logo" className="logo" />
        </h1>
        {userName && (

  <p className="username">

    Hello! {userName}

  </p>

)}
        <div className="nav-links">
            <Link to="/">Home</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/about">About</Link>
        <Link to="/saved">Saved</Link>
        <button
  className="logout-btn"
  onClick={() => {

  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("token");
  localStorage.removeItem("userName");

  window.location.href = "/";

}}
>

  Logout

</button>
        </div>
        {children}
    </div>
  )
}


export default Navbar
