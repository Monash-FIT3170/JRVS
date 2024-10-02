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
  const { deleteData } = useApi();

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
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
          color: "darkgray",
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
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
      </Menu>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Unit"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this unit? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UnitOverflowMenu;
