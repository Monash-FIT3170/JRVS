/**
 * @file TextBox.js
 * @description A React component for displaying a text box with a heading and body text. Utilizes Material-UI components for styling and layout.
 * @module TextBox
 * @requires @mui/material/Typography
 * @requires @mui/material/Box
 * @requires React
 *
 * @param {Object} props - The component props.
 * @param {string} props.heading - The heading text to display above the body content.
 * @param {string} props.text - The body text content to display within the text box.
 *
 * @returns {JSX.Element} The rendered TextBox component.
 *
 * @example
 * <TextBox
 *   heading="Introduction"
 *   text="This is an introductory paragraph describing the content of the text box."
 * />
 */

import React from "react";
import { Typography, Box } from "@mui/material";
import "./textBox.css";

export default function TextBox(props) {
  return (
    <Box
      borderRadius={5}
      p={5}
      sx={{
        backgroundColor: "#FFFFFF",
        width: "100%",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <h2 className="heading-font">{props.heading}</h2>
      <Typography variant="body" className="text-font" sx={{ color: "black" }}>
        {props.text}
      </Typography>
    </Box>
  );
}
