/**
 * @file editMultipleImageTextBox.js
 * @description A React component for editing a content item consisting of a heading, text, and multiple image URLs. This component allows users to update the heading, text, and image sources dynamically and provides validation feedback on the image URLs.
 * @module editMultipleImageTextBox
 * @requires @mui/material/Box
 * @requires @mui/material/Button
 * @requires @mui/material/IconButton
 * @requires @mui/material/TextField
 * @requires @mui/icons-material/AddCircle
 * @requires @mui/icons-material/RemoveCircle
 * @requires @mui/icons-material/Edit
 * @requires react
 * @param {Object} props - Component properties.
 * @param {string} props.heading - The initial heading text for the content item.
 * @param {string} props.text - The initial body text for the content item.
 * @param {string[]} props.imageSrcs - An array of image URLs associated with the content item.
 * @param {number} props.index - The index of the current content item within the list.
 * @param {Function} props.updateContent - A callback function to update the content item. Receives the index and new content object.
 * @returns {JSX.Element} A Box component containing editable fields for heading, text, and image URLs, along with add/remove buttons for images and a save button.
 * @example
 * // Example usage of EditMultipleImageTextBox
 * <EditMultipleImageTextBox
 *   heading="Sample Heading"
 *   text="Sample text content."
 *   imageSrcs={["http://example.com/image1.png", "http://example.com/image2.png"]}
 *   index={0}
 *   updateContent={(index, newContent) => console.log("Update content at index", index, "with", newContent)}
 * />
 */

import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import "./editComponents.css";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function EditMultipleImageTextBox({
  heading,
  text,
  imageSrcs,
  index,
  updateContent,
}) {
  const [headingChanged, setHeadingChanged] = useState(false);
  const [textChanged, setTextChanged] = useState(false);
  const [imageSrcsChanged, setImageSrcsChanged] = useState(false);
  const [currentHeading, setCurrentHeading] = useState(heading);
  const [currentText, setCurrentText] = useState(text);
  const [currentImageSrcs, setCurrentImageSrcs] = useState(imageSrcs);
  const [isValid, setIsValid] = useState(false);

  const handleHeadingChange = (event) => {
    setCurrentHeading(event.target.value);
    if (event.target.value !== heading) setHeadingChanged(true);
    else setHeadingChanged(false);
  };

  const handleImageSrcChange = (event, index) => {
    if (event.target.value !== imageSrcs[index]) {
      setImageSrcsChanged(true);
      const updatedImageSrcs = currentImageSrcs.map((imageSrc, i) =>
        i === index ? event.target.value : imageSrc,
      );
      setCurrentImageSrcs(updatedImageSrcs);
    } else setImageSrcsChanged(false);
  };

  const handleTextChange = (event) => {
    setCurrentText(event.target.value);
    if (event.target.value !== text) setTextChanged(true);
    else setTextChanged(false);
  };

  const handleImageSrcAdd = () => {
    const newImageSrc = "";
    setCurrentImageSrcs([...currentImageSrcs, newImageSrc]);
    setImageSrcsChanged(true);
  };

  const handleImageSrcRemove = () => {
    setCurrentImageSrcs(currentImageSrcs.slice(0, -1));
    setImageSrcsChanged(true);
  };

  const handleSave = () => {
    updateContent(index, {
      type: "multipleImageTextBox",
      heading: currentHeading,
      text: currentText,
      imageSrcs: currentImageSrcs,
    });
    setHeadingChanged(false);
    setTextChanged(false);
  };

  // validate image urls
  useEffect(() => {
    let componentMounted = true;
    const validateImages = async () => {
      const results = await Promise.all(
        currentImageSrcs.map((src) => {
          return new Promise((resolve) => {
            const image = new Image();
            image.src = src;
            image.onload = () => resolve(true);
            image.onerror = () => resolve(false);
          });
        }),
      );
      if (componentMounted) {
        setIsValid(results.every((result) => result));
      }
    };
    validateImages();
    return () => {
      componentMounted = false;
    };
  }, [currentImageSrcs]);

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
          {index + 1}. Text & Gallery
        </Typography>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <h2 className="text-font">Heading</h2>
        <TextField
          onChange={handleHeadingChange}
          fullWidth
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
          required
          multiline
          variant="outlined"
          rows={6}
          maxRows={6}
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

        <h2 className="text-font">Image Links</h2>
        {currentImageSrcs &&
          currentImageSrcs.map((imageSrc, index) => (
            <TextField
              onChange={(event) => handleImageSrcChange(event, index)}
              fullWidth
              multiline
              variant="filled"
              label={"Image Link " + (index + 1)}
              minRows={1}
              maxRows={2}
              defaultValue={imageSrc ? imageSrc : ""}
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
          {currentImageSrcs && currentImageSrcs.length > 0 && (
            <IconButton onClick={handleImageSrcRemove}>
              <RemoveCircleIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
          )}
          <IconButton onClick={handleImageSrcAdd}>
            <AddCircleIcon fontSize="large" sx={{ color: "white" }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "20px",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleSave}
          disabled={
            (!headingChanged && !textChanged && !imageSrcsChanged) || !isValid
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
        {!isValid && imageSrcsChanged && (
          <h2 className="error-font" style={{ marginLeft: "5px" }}>
            Invalid Image Links
          </h2>
        )}
      </Box>
    </Box>
  );
}
