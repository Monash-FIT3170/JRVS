import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UnitOverflowMenu = ({ unit, onDelete, userType }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete(unit);
    handleMenuClose();
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
          top: 5,
          right: 5,
          color: "white",
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
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={null}>Edit</MenuItem>
        {/* IMPLEMENT EDIT */}
      </Menu>
    </>
  );
};

export default UnitOverflowMenu;
