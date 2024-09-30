/**
 * @file UnitCard Component
 *
 * @description A card component displaying a unit with an icon, progress indicator, and title.
 * The card features a customizable background color for the icon area and displays
 * progress as a linear progress bar with percentage. It also includes a three-dot
 * options button next to the title with "Edit" and "Delete" options.
 *
 * @module UnitCard
 * @requires react
 * @requires @mui/material/Card
 * @requires @mui/material/CardContent
 * @requires @mui/material/Typography
 * @requires @mui/material/Icon
 * @requires @mui/material/LinearProgress
 * @requires @mui/material/Box
 * @requires @mui/material/IconButton
 * @requires @mui/material/Menu
 * @requires @mui/material/MenuItem
 * @requires @mui/icons-material/MoreVert
 *
 * @returns {JSX.Element} The rendered UnitCard component
 */

import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three dots icon
import Menu from "@mui/material/Menu"; // For the options dropdown
import MenuItem from "@mui/material/MenuItem"; // For each option (Edit, Delete)

const UnitCard = ({ title, progress, imageColour, icon, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage the menu's anchor (open/close)
  const open = Boolean(anchorEl); // Boolean to determine if the menu is open

  // Function to open the menu
  const handleMenuOpen = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    setAnchorEl(event.currentTarget);
  };

  // Function to close the menu
  const handleMenuClose = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    setAnchorEl(null);
  };

  // Function to handle the Edit option
  const handleEdit = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    handleMenuClose(); // Close the menu
    if (onEdit) onEdit(); // Trigger the edit callback if provided
  };

  // Function to handle the Delete option
  const handleDelete = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    handleMenuClose(); // Close the menu
    if (onDelete) onDelete(); // Trigger the delete callback if provided
  };

  return (
    <Card style={{ borderRadius: 15 }} className="unit-card">
      <React.Fragment>
        <CardContent style={{ padding: 0 }}>
          <div
            style={{
              backgroundColor: imageColour,
              width: "100%",
              height: 240,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Icon style={{ fontSize: 160, color: "white" }}>{icon}</Icon>
          </div>
        </CardContent>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Typography>
            <IconButton
              aria-label="more options"
              onClick={handleMenuOpen} // Open the menu
            >
              <MoreVertIcon />
            </IconButton>

            {/* Menu with three dots */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography
                variant="body2"
                color="text.secondary"
              >{`${Math.round(progress)}%`}</Typography>
            </Box>
          </Box>
        </CardContent>
      </React.Fragment>
    </Card>
  );
};

export default UnitCard;
