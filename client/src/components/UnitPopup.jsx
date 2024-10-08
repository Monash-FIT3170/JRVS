/**
 * @file UnitPopup Component
 *
 * @description A modal dialog used for displaying details about a unit and providing actions based on user roles.
 * The dialog includes options for entering a lesson, and, if the user is an admin, inserting, appending,
 * editing, and deleting modules.
 *
 * @module UnitPopup
 * @requires react
 * @requires @mui/material/Dialog
 * @requires @mui/material/DialogTitle
 * @requires @mui/material/DialogContent
 * @requires @mui/material/DialogContentText
 * @requires @mui/material/DialogActions
 * @requires @mui/material/Button
 * @requires @mui/material/IconButton
 * @requires @mui/icons-material/Close
 *
 * @returns {JSX.Element} The rendered UnitPopup component
 */

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const UnitPopup = ({
  unitId,
  isOpen,
  node,
  onClose,
  onInsert,
  onAppend,
  onEdit,
  onDelete,
  isAdmin,
}) => {
  const handleEnterLesson = () => {
    window.location.href = `/${node.type}/${unitId}/${node.id}`;
  };

  const titleStyle = {
    color: "#3ca3ee", // Blue color
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "20px 0",
  };

  const contentStyle = {
    fontSize: "18px",
    textAlign: "center",
    marginBottom: "20px",
  };

  const buttonStyle = {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "10px",
    whiteSpace: "nowrap",
  };

  const buttonPrimary = {
    ...buttonStyle,
    backgroundColor: "#3ca3ee",
    color: "#fff",
  };

  const buttonGreen = {
    ...buttonStyle,
    backgroundColor: "#34a853",
    color: "#fff",
  };

  const buttonRed = {
    ...buttonStyle,
    backgroundColor: "#dd514a",
    color: "#fff",
  };

  const buttonEdit = {
    ...buttonStyle,
    backgroundColor: "#646464",
    color: "#fff",
  };

  const dialogTitleStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "24px",
    paddingLeft: "24px",
  };

  const horizontalLineStyle = {
    width: "93%",
    margin: "10px auto",
    borderTop: "2px solid #CCCCCC",
  };

  const dialogStyle = {
    borderRadius: "15px",
  };

  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ style: dialogStyle }}>
      <DialogTitle style={dialogTitleStyle}>
        <span style={titleStyle}>{node && node.title}</span>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ margin: "12px" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={contentStyle}>
          {node && node.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button onClick={handleEnterLesson} style={buttonPrimary}>
          Enter
        </Button>
      </DialogActions>

      {isAdmin && (
        <div>
          {/* Horizontal line */}
          <div style={horizontalLineStyle}></div>

          {/* Admin buttons */}
          <DialogActions style={{ justifyContent: "center" }}>
            <Button onClick={onInsert} style={buttonGreen}>
              Insert Module
            </Button>
            <Button onClick={onAppend} style={buttonGreen}>
              Append Module
            </Button>
            <Button onClick={onEdit} style={buttonEdit}>
              Edit
            </Button>
            <Button onClick={onDelete} style={buttonRed}>
              Delete
            </Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
};

export default UnitPopup;
