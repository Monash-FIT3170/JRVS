/**
 * @file LoginPage.jsx
 * @description This component renders the login page for the application. It includes a form for users to input their username and password. On successful login, the user is redirected to the home page with their avatar state. The page also features a styled panel with an avatar image.
 *
 * @module LoginPage
 * @requires React
 * @requires Grid from '@mui/material/Unstable_Grid2'
 * @requires useApi from '../context/ApiProvider'
 * @requires Link and useLocation, useNavigate from 'react-router-dom'
 * @requires BotBox from "../components/content/botBox"
 *
 * @component
 * @example
 * <LoginPage />
 *
 * @returns {JSX.Element} The Login Page component
 */

import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useApi } from "../context/ApiProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BotBox from "../components/content/botBox";

const LoginPage = () => {
  // Create the hooks for the different inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { postData } = useApi();

  // Get avatarState from state or default to blue
  const avatarState = location.state?.avatarState || "blue";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    if (!username) {
      setErrorMessage("Please enter a valid username and password.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter a valid username and password.");
      return;
    }
    try {
      const res = await postData("api/auth/login", { username, password });
      console.log(res);
      localStorage.setItem("token", res.token);
      navigate("/", { state: { avatarState } });
    } catch (error) {
      console.error("Login failed", error);
      // Handle different error messages
      if (error.response?.data?.message === "User does not exist") {
        setErrorMessage("User does not exist. Please check your credentials.");
      } else if (error.response?.data?.message === "Incorrect password") {
        setErrorMessage("Incorrect password. Please try again.");
      } else {
        setErrorMessage("Username or password incorrect. Please try again.");
      }
    }
  };

  return (
    <Grid container className="relative h-screen">
      <Grid xs={3}>
        {/* Left Blue Panel */}
        <div className="h-full w-full bg-ai-blue"></div>
      </Grid>
      <Grid
        xs={9}
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Form */}
        <form
          className="p-5 flex flex-col items-center justify-center space-y-4"
          onSubmit={handleSubmit}
        >
          <h1 className="russo-one-regular text-7xl text-ai-blue">JRVS</h1>

          <div>
            <span className="text-gray-700">Username</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            ></input>
          </div>

          <div>
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>

          {/* Display error message below the password input */}
          {errorMessage && (
            <div
              style={{
                color: "red",
                marginTop: "10px",
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </div>
          )}

          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>

          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              state={{ avatarState }}
              className="text-blue-500 hover:text-blue-700"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </Grid>
      {/* Avatar Middle Panel */}
      <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
        {/* Avatar */}
        <BotBox
          backgroundColor="transparent"
          boxShadow=""
          width={{
            xs: "0px",
            sm: "0px",
            md: "400px",
            lg: "400px",
            xl: "400px",
          }}
          height={{
            xs: "0px",
            sm: "0px",
            md: "400px",
            lg: "400px",
            xl: "400px",
          }}
          avatarState={avatarState}
        />
      </div>
    </Grid>
  );
};

export default LoginPage;
