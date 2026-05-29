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

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (!email || !password) {

    setError(
      "Please fill all fields"
    );

    return;

  }

  try {

    const response = await fetch(

      "http://localhost:8000/api/auth/login",

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          email,

          password

        })

      }

    );

    const data =
      await response.json();

    if (response.ok) {
      localStorage.setItem(
  "userName",
  data.user.name
);

      // Save JWT Token

      localStorage.setItem(

        "token",

        data.token

      );

      // Login State

      localStorage.setItem(

        "isLoggedIn",

        "true"

      );

      localStorage.setItem(

        "userEmail",

        email

      );

      setIsLoggedIn(true);

      window.location.href = "/";

    }

    else {

      setError(
        data.message
      );

    }

  }

  catch (error) {

    console.log(error);

    setError(
      "Something went wrong"
    );

  }

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