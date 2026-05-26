import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Signup({
  setIsLoggedIn
}) {

  const [email, setEmail] =
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

  const checkStrength = (value) => {

    let strongPassword =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

    if (value.length < 6) {

      setStrength("Weak");

    } else if (
      strongPassword.test(value)
    ) {

      setStrength("Strong");

    } else {

      setStrength("Medium");

    }

  };

  const handlePassword = (e) => {

    setPassword(
      e.target.value
    );

    checkStrength(
      e.target.value
    );

  };

  const handleSubmit = (e) => {

  e.preventDefault();

  if (
    password !==
    confirmPassword
  ) {

    setError(
      "Passwords do not match"
    );

    return;

  }

  // SAVE USER DATA

  localStorage.setItem(
    "userEmail",
    email
  );

  localStorage.setItem(
    "userPassword",
    password
  );

  // LOGIN USER

  localStorage.setItem(
    "isLoggedIn",
    "true"
  );

  setIsLoggedIn(true);

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

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

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

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />

        <p className="strength">
          Strength:
          {strength}
        </p>

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />

        <button type="submit">
          Signup
        </button>

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