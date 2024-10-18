/**
 * @file PasswordChangePopup Component
 *
 * @description A modal component for changing a user's password. It allows the user to input their old password,
 * a new password, and confirm the new password. The modal includes visibility toggles for password fields
 * and handles form submission with validation for password confirmation.
 *
 * @module PasswordChangePopup
 * @requires react
 * @requires @mui/material/Modal
 * @requires @mui/material/Box
 * @requires @mui/material/Button
 * @requires @mui/material/TextField
 * @requires @mui/material/IconButton
 * @requires @mui/icons-material/Visibility
 * @requires @mui/icons-material/VisibilityOff
 * @requires @mui/icons-material/Close
 * @requires ../index.css
 *
 * @param {boolean} open - Whether the modal is open or closed.
 * @param {function} onClose - Function to call when the modal is closed.
 * @param {function} onSubmit - Function to call when the form is submitted with the old and new passwords.
 *
 * @returns {JSX.Element} The rendered modal component for password change.
 */

import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import "../index.css";

const PasswordChangePopup = ({ open, onClose, onSubmit }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      alert("New password and confirmation do not match.");
      return;
    }
    onSubmit(oldPassword, newPassword);
  };

  const toggleShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          borderRadius: "20px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            left: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Old Password"
            type={showOldPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={toggleShowOldPassword}>
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <TextField
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={toggleShowNewPassword}>
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <TextField
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={toggleShowConfirmPassword}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          {errorMessage && (
            <div
              style={{ color: "red", fontSize: "0.875rem", marginTop: "4px" }}
            >
              {errorMessage}
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <Button type="submit" class="default-button">
              Change Password
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default PasswordChangePopup;
