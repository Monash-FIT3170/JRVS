/**
 * @file editListBox.js
 * @description A React component that provides an editable list box for users to modify content dynamically. This component allows users to update a heading and a list of items, add or remove list items, and save changes.
 * @module EditListBox
 * @requires @mui/material/Box
 * @requires @mui/material/Button
 * @requires @mui/material/IconButton
 * @requires @mui/material/TextField
 * @requires @mui/icons-material/AddCircle
 * @requires @mui/icons-material/RemoveCircle
 * @requires @mui/icons-material/Edit
 * @requires React
 * 
 * @param {Object} props - The component props.
 * @param {string} props.heading - The heading of the list box.
 * @param {Array<string>} props.points - The list of points/items to display and edit.
 * @param {number} props.index - The index of the list box in the parent component.
 * @param {Function} props.updateContent - Function to update the content of the list box.
 * 
 * @returns {JSX.Element} The rendered EditListBox component.
 */


import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import "./editComponents.css";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function EditListBox({ heading, points, index, updateContent }) {
  const [headingChanged, setHeadingChanged] = useState(false);
  const [pointsChanged, setPointsChanged] = useState(false);
  const [currentHeading, setCurrentHeading] = useState(heading);
  const [currentPoints, setCurrentPoints] = useState(points);

  const handleHeadingChange = (event) => {
    setCurrentHeading(event.target.value);
    if (event.target.value !== heading) setHeadingChanged(true);
    else setHeadingChanged(false);
  };

  const handlePointChange = (event, index) => {
    if (event.target.value !== points[index]) {
      setPointsChanged(true);
      const updatedPoints = currentPoints.map((point, i) =>
        i === index ? event.target.value : point,
      );
      setCurrentPoints(updatedPoints);
    } else setPointsChanged(false);
  };

  const handlePointsAdd = () => {
    const newPoint = "";
    setCurrentPoints([...currentPoints, newPoint]);
    setPointsChanged(true);
  };

  const handlePointsRemove = () => {
    setCurrentPoints(currentPoints.slice(0, -1));
    setPointsChanged(true);
  };

  const handleSave = () => {
    updateContent(index, {
      type: "listBox",
      heading: currentHeading,
      points: currentPoints,
    });
    setHeadingChanged(false);
    setPointsChanged(false);
  };

  return (
    <Box
      sx={{
        bgcolor: "#6AB6F3",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        width: "50%",
        borderRadius: "15px",
        marginBottom: "20px",
        marginLeft: "70px",
        position: "relative",
        padding: "10px",
      }}
    >
      <Box sx={{ padding: "20px" }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "36px",
            fontWeight: "600",
            color: "#FFFFFF",
            letterSpacing: "0.5px",
          }}
        >
          {index + 1}. List
        </Typography>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <h2 className="text-font ">Heading</h2>
        <TextField
          fullWidth
          onChange={handleHeadingChange}
          required
          multiline
          minRows={1}
          maxRows={3}
          variant="outlined"
          defaultValue={heading || ""}
          sx={{
            width: "100%",
            marginBottom: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#EFEFEF",
            },
          }}
        />

        <h2 className="text-font">List Items</h2>
        {currentPoints &&
          currentPoints.map((point, index) => (
            <TextField
              onChange={(event) => handlePointChange(event, index)}
              fullWidth
              multiline
              variant="filled"
              label={"Point " + (index + 1)}
              minRows={1}
              maxRows={3}
              defaultValue={point}
              sx={{
                width: "100%",
                marginBottom: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#EFEFEF",
                },
              }}
              key={index}
            />
          ))}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "8px",
          }}
        >
          {currentPoints && currentPoints.length > 0 && (
            <IconButton onClick={handlePointsRemove}>
              <RemoveCircleIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
          )}
          <IconButton onClick={handlePointsAdd}>
            <AddCircleIcon fontSize="large" sx={{ color: "white" }} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleSave}
          disabled={!headingChanged && !pointsChanged}
          sx={{
            ":hover": { backgroundColor: "#F7B92C" },
            "&:disabled": {
              backgroundColor: "#A9C3D9",
            },
            padding: "15px",
            paddingX: "20px",
            borderRadius: "10px",
            backgroundColor: "#FFC93C",
            pointerEvents: "auto",
          }}
        >
          EDIT
        </Button>
      </Box>
    </Box>
  );
}
