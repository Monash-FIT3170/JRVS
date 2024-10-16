/**
 * @file EditTextBox.js
 * @description A component that provides an editable text box with a heading and content area. It allows users to modify the heading and text content, and save the changes with an "EDIT" button. The component manages its own state for tracking changes and updates the content via a callback function.
 * @module EditTextBox
 * @requires @mui/material/Box
 * @requires @mui/material/Button
 * @requires @mui/material/TextField
 * @requires @mui/icons-material/Edit
 * @param {Object} props - Component properties.
 * @param {string} props.heading - The initial heading text for the text box.
 * @param {string} props.text - The initial content text for the text box.
 * @param {number} props.index - The index of the text box within a list of items, used for identifying which text box to update.
 * @param {Function} props.updateContent - Callback function to update the content when the "EDIT" button is clicked. Receives the index and an object with updated heading and text.
 * @returns {JSX.Element} A styled Box component containing editable TextFields for heading and text, and a button to save changes.
 * @example
 * // Example usage of EditTextBox
 * <EditTextBox
 *   heading="Initial Heading"
 *   text="Initial content goes here..."
 *   index={0}
 *   updateContent={(index, updatedContent) => {
 *     console.log("Updated content for index", index, ":", updatedContent);
 *   }}
 * />
 */

import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import "./editComponents.css";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function EditTextBox({ heading, text, index, updateContent }) {
  const [headingChanged, setHeadingChanged] = useState(false);
  const [textChanged, setTextChanged] = useState(false);
  const [currentHeading, setCurrentHeading] = useState(heading);
  const [currentText, setCurrentText] = useState(text);

  const handleHeadingChange = (event) => {
    setCurrentHeading(event.target.value);
    if (event.target.value !== heading) setHeadingChanged(true);
    else setHeadingChanged(false);
  };

  const handleTextChange = (event) => {
    setCurrentText(event.target.value);
    if (event.target.value !== text) setTextChanged(true);
    else setTextChanged(false);
  };

  const handleSave = () => {
    updateContent(index, {
      type: "textBox",
      heading: currentHeading,
      text: currentText,
    });
    setHeadingChanged(false);
    setTextChanged(false);
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
          {index + 1}. Text Only
        </Typography>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <h2 className="text-font">Heading</h2>
        <TextField
          onChange={handleHeadingChange}
          fullWidth
          required
          variant="outlined"
          minRows={1}
          maxRows={3}
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

        <h2 className="text-font">Text Content</h2>
        <TextField
          onChange={handleTextChange}
          fullWidth
          required
          multiline
          variant="outlined"
          rows={6}
          maxRows={6}
          defaultValue={text || ""}
          sx={{
            width: "100%",

            backgroundColor: "white",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#EFEFEF",
            },
          }}
        />
      </Box>
      <Box sx={{ padding: "20px" }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleSave}
          disabled={!headingChanged && !textChanged}
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
