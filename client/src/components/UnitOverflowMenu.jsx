/**
 * @file UnitOverflowMenu Component
 *
 * @description A component that provides a menu with options to edit or delete a unit. Only accessible to admin and teacher roles.
 * It includes a confirmation dialog for deletion, calling an API to perform the delete action and handling success or failure.
 *
 * @module UnitOverflowMenu
 * @requires react
 * @requires @mui/material/IconButton
 * @requires @mui/material/Menu
 * @requires @mui/material/MenuItem
 * @requires @mui/material/Dialog
 * @requires @mui/material/DialogTitle
 * @requires @mui/material/DialogContent
 * @requires @mui/material/DialogContentText
 * @requires @mui/material/DialogActions
 * @requires @mui/material/Button
 * @requires @mui/icons-material/MoreVert
 * @requires ../context/ApiProvider
 *
 * @returns {JSX.Element} The rendered UnitOverflowMenu component
 */

import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useApi } from "../context/ApiProvider";

const UnitOverflowMenu = ({ unit, onDelete, userType }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { deleteData } = useApi();

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleMenuEdit = (event) => {
    event.stopPropagation();
    handleMenuClose(event);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    handleMenuClose(event);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async (event) => {
    event.stopPropagation();
    try {
      await deleteData(`api/units/${unit._id}`);
      onDelete(unit);
    } catch (error) {
      console.error("Error deleting unit:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = (event) => {
    event.stopPropagation();
    setIsDeleteDialogOpen(false);
  };

  if (userType !== "admin" && userType !== "teacher") {
    return null;
  }

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        style={{
          position: "absolute",
          bottom: 50,
          right: -2,
          color: "#777777",
          zIndex: 1,
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            color: "#3ca3ee",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {"Delete Unit"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this unit? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
            style={{
              color: "#777777",
              margin: "10px",
              fontSize: "16px",
              padding: "5px 10px",
              borderRadius: "10px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            autoFocus
            style={{
              margin: "10px",
              fontSize: "16px",
              padding: "5px 10px",
              borderRadius: "10px",
              backgroundColor: "#dd514a",
              color: "#fff",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UnitOverflowMenu;
