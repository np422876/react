import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login({
  setIsLoggedIn
}) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = (e) => {

  e.preventDefault();

  const storedEmail =
    localStorage.getItem(
      "userEmail"
    );

  const storedPassword =
    localStorage.getItem(
      "userPassword"
    );

  if (
    email !== storedEmail
  ) {

    setError(
      "Email not found"
    );

    return;
  }

  if (
    password !== storedPassword
  ) {

    setError(
      "Incorrect password"
    );

    return;
  }

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
          Welcome Back
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
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button type="submit">
          Login
        </button>

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