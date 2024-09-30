import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const UnitCard = ({ title, progress, imageColour, icon, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    handleMenuClose(); // Close the menu
    if (onEdit) onEdit(); // Trigger the edit callback if provided
  };

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
            <IconButton aria-label="more options" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>

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
              <Typography variant="body2" color="text.secondary">
                {`${Math.round(progress)}%`}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </React.Fragment>
    </Card>
  );
};

export default UnitCard;
