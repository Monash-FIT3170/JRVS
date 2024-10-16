/**
 * @file EditImageTextBox.js
 * @description A React component for editing a combination of text and an image URL. The component allows users to update a heading, text content, and an image link. It validates the image URL and provides feedback to ensure the entered URL is valid.
 * @module EditImageTextBox
 * @requires @mui/material/Box
 * @requires @mui/material/Button
 * @requires @mui/material/TextField
 * @requires @mui/icons-material/Edit
 * @requires React
 *
 * @param {Object} props - The component props.
 * @param {string} props.heading - The heading for the image text box.
 * @param {string} props.text - The text content associated with the image.
 * @param {string} props.imageSrc - The URL of the image to be displayed.
 * @param {number} props.index - The index of the image text box in the parent component.
 * @param {Function} props.updateContent - Function to update the content when changes are saved.
 *
 * @returns {JSX.Element} The rendered EditImageTextBox component.
 *
 * @example
 * <EditImageTextBox
 *   heading="Sample Heading"
 *   text="Sample text content"
 *   imageSrc="https://example.com/image.png"
 *   index={0}
 *   updateContent={(index, updatedContent) => console.log(index, updatedContent)}
 * />
 */

import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import "./editComponents.css";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function EditImageTextBox({
  heading,
  text,
  imageSrc,
  index,
  updateContent,
}) {
  const [headingChanged, setHeadingChanged] = useState(false);
  const [textChanged, setTextChanged] = useState(false);
  const [imageSrcChanged, setImageSrcChanged] = useState(false);
  const [currentHeading, setCurrentHeading] = useState(heading);
  const [currentText, setCurrentText] = useState(text);
  const [currentImageSrc, setCurrentImageSrc] = useState(imageSrc);
  const [isValid, setIsValid] = useState(true);

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

  const handleImageSrcChange = (event) => {
    setCurrentImageSrc(event.target.value);
    if (event.target.value !== imageSrc) setImageSrcChanged(true);
    else setImageSrcChanged(false);
  };

  const handleSave = () => {
    updateContent(index, {
      type: "imageTextBox",
      heading: currentHeading,
      text: currentText,
      imageSrc: currentImageSrc,
    });
    setHeadingChanged(false);
    setTextChanged(false);
  };

  // validate image url
  useEffect(() => {
    if (currentImageSrc === "") setIsValid(true);
    else {
      const img = new Image();
      img.src = currentImageSrc;
      img.onload = () => {
        setIsValid(true);
      };

      img.onerror = () => {
        setIsValid(false);
      };
    }
  }, [currentImageSrc]);

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
          {index + 1}. Text & Image
        </Typography>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <h2 className="text-font">Heading</h2>
        <TextField
          onChange={handleHeadingChange}
          fullWidth
          multiline
          minRows={1}
          maxRows={3}
          required
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

        <h2 className="text-font">Text Content</h2>
        <TextField
          onChange={handleTextChange}
          fullWidth
          rows={6}
          maxRows={6}
          required
          multiline
          variant="outlined"
          defaultValue={text || ""}
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

        <h2 className="text-font">Image Link</h2>
        <TextField
          onChange={handleImageSrcChange}
          fullWidth
          required
          multiline
          variant="outlined"
          minRows={1}
          maxRows={2}
          defaultValue={imageSrc || ""}
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
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleSave}
          disabled={
            (!headingChanged && !textChanged && !imageSrcChanged) || !isValid
          }
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
        {!isValid && (
          <h2 className="error-font" style={{ marginLeft: "5px" }}>
            Invalid Image Link
          </h2>
        )}
      </Box>
    </Box>
  );
}
