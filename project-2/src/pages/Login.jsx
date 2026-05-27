import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./Auth.css";

function Login({
  setIsLoggedIn
}) {

  const [email, setEmail] =useState("");

  const [password, setPassword] =useState("");

  const [error, setError] =useState("");

  const [showPassword,setShowPassword] =useState(false);

  // Email Validation Pattern

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {

    e.preventDefault();

    // Empty Fields Check

    if (!email || !password) 
      {
      setError("Please fill all fields");

      return;

    }

    // Email Validation

    if (!emailPattern.test(email)) 
      {

      setError("Enter a valid email address");

      return;

    }

    // Get Stored User

    const storedEmail =localStorage.getItem("userEmail");

    const storedPassword =localStorage.getItem("userPassword");

    // Email Check

    if (email !== storedEmail) {

      setError("Email not found");

      return;

    }

    // Password Check

    if (password !== storedPassword) {

      setError("Incorrect password");

      return;

    }

    // Clear Error

    setError("");

    // Login User

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    setIsLoggedIn(true);

    // Redirect Home

    window.location.href = "/";

  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>
          Welcome Back
        </h1>

        {/* Error */}

        {error && (

          <p className="auth-error">
            {error}
          </p>

        )}

        {/* Email */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        {/* Password */}

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        {/* Show Password */}

        <div className="show-password">

  <input
    type="checkbox"
    id="showPassword"
    checked={showPassword}
    onChange={() =>
      setShowPassword(
        !showPassword
      )
    }
  />

  <label htmlFor="showPassword">
    Show Password
  </label>

</div>

        {/* Login Button */}

        <button type="submit">

          Login

        </button>

        {/* Signup Link */}

        <p>

          Don't have account?

          <Link to="/signup">

            Signup

          </Link>

        </p>

      </form>

    </div>

  );

}

export default Login;