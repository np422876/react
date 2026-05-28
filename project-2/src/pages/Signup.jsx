import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./Auth.css";

function Signup({
  setIsLoggedIn
}) {

  const [email, setEmail] =
    useState("");

  const [name, setName] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [strength, setStrength] =
    useState("");

  const [error, setError] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  // Email Validation

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password Strength Checker

  const checkStrength = (value) => {

    const strongPassword =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

    if (value.length < 6) {

      setStrength("Weak");

    }

    else if (
      strongPassword.test(value)
    ) {

      setStrength("Strong");

    }

    else {

      setStrength("Medium");

    }

  };

  // Password Input

  const handlePassword = (e) => {

    setPassword(
      e.target.value
    );

    checkStrength(
      e.target.value
    );

  };

  // Form Submit

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Empty Fields Check

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      setError(
        "Please fill all fields"
      );

      return;

    }

    // Email Validation

    if (
      !emailPattern.test(email)
    ) {

      setError(
        "Enter a valid email address"
      );

      return;

    }

    // Password Validation

    if (password.length < 6) {

      setError(
        "Password must be at least 6 characters"
      );

      return;

    }

    // Confirm Password Check

    if (
      password !==
      confirmPassword
    ) {

      setError(
        "Passwords do not match"
      );

      return;

    }

    // Clear Error

    setError("");

    try {

      const response = await fetch(

        "http://localhost:8000/api/auth/register",

        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            name,

            email,

            password

          })

        }

      );

      const data =
        await response.json();

      if (response.ok) {

        // Save Login State

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        localStorage.setItem(
          "userName",
          name
        );

        localStorage.setItem(
          "userEmail",
          email
        );

        // Login User

        setIsLoggedIn(true);

        // Redirect Home

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
          Create Account
        </h1>

        {/* Error */}

        {error && (

          <p className="auth-error">
            {error}
          </p>

        )}

        {/* Name */}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

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
          onChange={handlePassword}
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

        {/* Password Strength */}

        <p className="strength">

          Password Strength:
          {" "}
          {strength}

        </p>

        {/* Confirm Password */}

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />

        {/* Signup Button */}

        <button type="submit">

          Signup

        </button>

        {/* Login Link */}

        <p>

          Already have account?

          <Link to="/">

            Login

          </Link>

        </p>

      </form>

    </div>

  );

}

export default Signup;