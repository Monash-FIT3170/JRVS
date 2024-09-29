/**
 * @file RegistrationPage.jsx
 * @description This component renders the registration page for new users. It includes a form for user details such as name, username, email, school, and password. Users can select their type (student or teacher) and customize their avatar color. Upon form submission, user data is sent to the server for registration.
 *
 * @module RegistrationPage
 * @requires React
 * @requires useEffect
 * @requires useState
 * @requires useLocation
 * @requires useNavigate
 * @requires @mui/material/Unstable_Grid2
 * @requires @mui/material/ToggleButton
 * @requires @mui/material/ToggleButtonGroup
 * @requires @mui/icons-material/School
 * @requires @mui/icons-material/HistoryEdu
 * @requires react-select
 * @requires ../context/ApiProvider
 * @requires ../components/content/botBox
 *
 * @component
 * @example
 * <RegistrationPage />
 *
 * @returns {JSX.Element} The Registration Page component
 */

import React, { useEffect, useState } from "react";
import { useApi } from "../context/ApiProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import BotBox from "../components/content/botBox";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SchoolIcon from "@mui/icons-material/School";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import Select from "react-select";

const RegistrationPage = () => {
  // Create the hooks for the different inputs
  const [usertype, setUsertype] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [schools, setSchools] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [schoolError, setSchoolError] = useState("");

  const location = useLocation();
  const [avatarState, setAvatarState] = useState(
    location.state?.avatarState || "blue",
  );

  const handleUserType = (event, newUsertype) => {
    if (newUsertype !== null) {
      setUsertype(newUsertype);
      setErrorMessage("");
      setNameError("");
      setUsernameError("");
      setEmailError("");
      setPasswordError("");
      setSchoolError("");
    }
  };

  const navigate = useNavigate();
  const { getData, postData } = useApi();

  // POST request to register user
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setNameError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setSchoolError("");

    let hasError = false;

    if (!usertype) {
      setErrorMessage("Please select either 'Student' or 'Teacher'.");
      hasError = true;
    }
    if (!firstname || !lastname) {
      setNameError("Please ensure you have filled both first and last name.");
      hasError = true;
    }
    if (!username) {
      setUsernameError("Username cannot be empty.");
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!password || password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      hasError = true;
    }

    if (!school) {
      setSchoolError("Please select a valid school.");
      hasError = true;
    }

    if (hasError) {
      return;
    }
    try {
      const res = await postData("api/auth/register", {
        usertype,
        username,
        firstname,
        lastname,
        email,
        school,
        password,
      });
      console.log(res);
      navigate("/login", { state: { avatarState } });
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  // Fetch the school data from mongodb, only run on the initial render
  useEffect(() => {
    const getSchools = async () => {
      try {
        const schoolData = await getData("api/schools/");
        const schoolNames = schoolData.map((school) => {
          return { value: school.SchoolName, label: school.SchoolName };
        });
        setSchools(schoolNames);
        console.log(schoolNames);
      } catch (error) {
        console.log(error);
      }
    };
    getSchools();
  }, [getData]);

  return (
    <Grid container className="relative h-screen">
      <Grid xs={2}>
        {/* Left Blue Panel */}
        <div className="h-full w-full bg-ai-blue"></div>
      </Grid>

      {/* Avatar Middle Panel */}
      <Grid
        xs={4}
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Avatar */}
        <div>
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

        {/* Colour boxes */}
        <div className="flex place-content-evenly">
          <div
            className="rounded-md bg-red-400 w-8 h-8 mr-4 hover:bg-red-300"
            onClick={() => setAvatarState("red")}
          ></div>
          <div
            className="rounded-md bg-cyan-400 w-8 h-8 mr-4 hover:bg-cyan-300"
            onClick={() => setAvatarState("blue")}
          ></div>
          <div
            className="rounded-md bg-purple-500 w-8 h-8 mr-4 hover:bg-purple-400"
            onClick={() => setAvatarState("purple")}
          ></div>
          <div
            className="rounded-md bg-green-300 w-8 h-8 mr-4 hover:bg-green-200"
            onClick={() => setAvatarState("green")}
          ></div>
        </div>
      </Grid>

      <Grid
        xs={4}
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
          <p className="text-6xl font-bold text-ai-blue mb-12 text-center">
            SIGN UP
          </p>
          {/* Create the grid layout */}

          <div className="grid grid-cols-1 gap-6">
            <div className="flex gap-2">
              <label>
                <span className="text-gray-700 mr">I am a</span>
                <div>
                  <ToggleButtonGroup
                    color="primary"
                    value={usertype}
                    exclusive
                    onChange={handleUserType}
                    aria-label="user type"
                    size="large"
                  >
                    <ToggleButton value="student" aria-label="student">
                      <SchoolIcon />
                      &nbsp;&nbsp;Student
                    </ToggleButton>
                    <ToggleButton value="teacher" aria-label="teacher">
                      <HistoryEduIcon />
                      &nbsp;&nbsp;Teacher
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </label>
            </div>
            {errorMessage && (
              <div style={{ color: "red", fontSize: "1rem" }}>
                {errorMessage}
              </div>
            )}
            <div className="flex gap-2">
              <label>
                <span className="text-gray-700 mr">First name</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                ></input>
              </label>
              <label>
                <span className="text-gray-700">Last name</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                ></input>
              </label>
            </div>
            {/* Display name error */}
            {nameError && (
              <div style={{ color: "red", fontSize: "1rem" }}>{nameError}</div>
            )}

            <label className="block">
              <span className="text-gray-700">Username</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              ></input>
            </label>

            {usernameError && (
              <div style={{ color: "red", fontSize: "1rem" }}>
                {usernameError}
              </div>
            )}
            <label className="block">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="john@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
            </label>
            {emailError && (
              <div style={{ color: "red", fontSize: "1rem" }}>{emailError}</div>
            )}

            <label className="block">
              <span className="text-gray-700">School</span>
              {/* <input type="text" 
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e) => setSchool(e.target.value)}
                            value={school}
                            ></input>                     */}
              <Select options={schools} onChange={(e) => setSchool(e.value)} />
            </label>
            {schoolError && (
              <div style={{ color: "red", fontSize: "1rem" }}>
                {schoolError}
              </div>
            )}
            <label className="block">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
            </label>
            {passwordError && (
              <div style={{ color: "red", fontSize: "1rem" }}>
                {passwordError}
              </div>
            )}
            <label className="block">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create My Account
              </button>
            </label>

            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                state={{ avatarState }}
                className="text-blue-500 hover:text-blue-700"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </Grid>
      <Grid xs={2}></Grid>
    </Grid>
  );
};

export default RegistrationPage;
