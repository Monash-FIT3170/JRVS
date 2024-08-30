/**
 * @file EditProfile.js
 * @description This component allows users to view and update their profile details, including personal information, username, email, and school. It also provides functionality for changing the password and displays appropriate popups upon successful updates.
 *
 * @module EditProfile
 * @requires React
 * @requires useState, useEffect from React
 * @requires useApi from ../context/ApiProvider
 * @requires Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button from @mui/material
 * @requires Select from react-select
 * @requires MenuBar from ../components/MenuBar
 * @requires PasswordChangePopup from ../components/PasswordChangePopup
 * @requires "../index.css"
 *
 * @example
 * // Example usage:
 * import EditProfile from './EditProfile';
 *
 * function App() {
 *   return <EditProfile />;
 * }
 *
 * @returns {JSX.Element} The rendered profile editing page, including user details form, password change functionality, and popups for confirmations.
 */

import React, { useEffect, useState } from "react";
import { useApi } from "../context/ApiProvider";
import Grid from "@mui/material/Unstable_Grid2";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import MenuBar from "../components/MenuBar";
import PasswordChangePopup from "../components/PasswordChangePopup";
import Select from "react-select";
import "../index.css";

const EditProfile = () => {
  // Create the hooks for the different inputs
  const [user, setUser] = useState({ username: "", points: 0, level: 0 });
  const [isUserLoading, setIsUserLoading] = useState(true);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [schools, setSchools] = useState("");
  const [password, setPassword] = useState("");

  // const location = useLocation();
  const { getData, postData } = useApi();

  // State to control the popups
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [confirmPasswordOpen, setConfirmPasswordOpen] = useState(false);

  // Handle popup close
  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirmPasswordClose = () => {
    setConfirmPasswordOpen(false);
  };

  // POST request to update user details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postData("api/users/updateDetails", {
        firstname,
        lastname,
        username,
        newUsername,
        email,
        school,
        password,
      });
      console.log(res);
      setConfirmOpen(true); // Open the popup on success
    } catch (error) {
      console.error("Updating user details failed", error);
    }
  };

  const handlePasswordChange = async (oldPassword, newPassword) => {
    try {
      const res = await postData("api/users/updatePassword", {
        username,
        oldPassword,
        newPassword,
      });
      console.log(res);
      setPasswordOpen(false);
      setConfirmPasswordOpen(true);
    } catch (error) {
      console.error("Password change failed", error);
      alert("Invalid Old Password");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await postData("api/auth/current", { token });
        const userData = await getData(`api/users/id/${res.decoded.id}`);
        setUser({
          username: userData.username,
          points: userData.points || 0,
          level: userData.level || 0,
        });
        setFirstname(userData.firstname);
        setLastname(userData.lastname);
        setEmail(userData.email);
        setSchool(userData.school);
        setUsername(userData.username);
        setNewUsername(userData.username);
        setIsUserLoading(false);
      } catch (error) {
        console.log(error);
        setIsUserLoading(true);
      }
    };
    fetchUser();
  }, [getData, postData]);

  // Fetch the school data from mongodb, only run on the initial render
  useEffect(() => {
    const getSchools = async () => {
      try {
        const schoolData = await getData("api/schools/");
        const schoolNames = schoolData.map((school) => {
          return { value: school.SchoolName, label: school.SchoolName };
        });
        setSchools(schoolNames);
      } catch (error) {
        console.log(error);
      }
    };
    getSchools();
  }, [getData]);

  return (
    <div className="App-page" style={{ height: "100vh" }}>
      <MenuBar />

      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid xs={2}></Grid>
        <Grid xs={8}>
          <p
            className="text-5xl font-bold mb-12 text-center"
            style={{ color: "white" }}
          >
            MY DETAILS
          </p>
        </Grid>
        <Grid xs={2}></Grid>

        {/* Row 2 */}
        <Grid xs={2}></Grid>
        <Grid
          xs={8}
          style={{
            backgroundColor: "white",
            padding: "20px",
            height: "100%",
            borderRadius: "20px",
          }}
        >
          {/* Form */}
          <form
            id="detailsform"
            className="p-5 flex flex-col items-center justify-center "
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 gap-6">
              <div className="flex gap-2">
                <label>
                  <span className="text-gray-700 mr">First name</span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
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

              <label className="block">
                <span className="text-gray-700">Username</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) => setNewUsername(e.target.value)}
                  value={newUsername}
                ></input>
              </label>

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

              <label className="block">
                <span className="text-gray-700">School</span>
                <Select
                  options={schools}
                  value={{ label: school, value: school }}
                  onChange={(e) => setSchool(e.value)}
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Password</span>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={"● ● ● ● ● ●"}
                  onClick={() => setPasswordOpen(true)}
                  readOnly
                ></input>
              </label>
            </div>
          </form>
        </Grid>
        <Grid xs={2}></Grid>

        {/* Row 3 */}
        <Grid xs={2}></Grid>
        <Grid xs={8}>
          <Grid container justifyContent="space-between">
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "20px",
              }}
            >
              <Button href="/profile" class="default-button">
                Go to My Profile
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "20px",
              }}
            >
              <button form="detailsform" class="default-button" type="submit">
                Update My Details
              </button>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={2}></Grid>
      </Grid>

      {/* Popup */}
      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        PaperProps={{ sx: { borderRadius: "15px" } }}
      >
        <DialogTitle>Update Successful</DialogTitle>
        <DialogContent>
          <p>Your details have been successfully updated.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} class="text-button">
            Close
          </Button>
          <Button
            href="/profile"
            variant="contained"
            color="primary"
            class="default-button"
          >
            Go to My Profile
          </Button>
        </DialogActions>
      </Dialog>

      {/* Password Change Popup */}
      <PasswordChangePopup
        open={passwordOpen}
        onClose={() => setPasswordOpen(false)}
        onSubmit={handlePasswordChange}
      />

      {/* Confirm Password Popup */}
      <Dialog
        open={confirmPasswordOpen}
        onClose={handleConfirmPasswordClose}
        PaperProps={{ sx: { borderRadius: "15px" } }}
      >
        <DialogTitle>Password Changed Successfully</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirmPasswordClose} class="text-button">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProfile;
