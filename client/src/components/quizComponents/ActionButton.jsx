/**
 * @file ActionButton.js
 * @description A customizable button component using Material-UI's Button component. Designed to handle click events and provide a distinct visual style with specific hover and active state styles.
 * @module ActionButton
 * @requires @mui/material/Button
 * @param {Object} props - Component properties.
 * @param {Function} props.onClick - Callback function to handle button clicks.
 * @param {React.ReactNode} props.children - Content to be displayed inside the button (e.g., text or icons).
 * @returns {JSX.Element} A Material-UI Button component styled with custom colors, padding, and hover effects.
 * @example
 * // Example usage of ActionButton
 * <ActionButton onClick={() => alert('Button clicked!')}>
 *   Click Me
 * </ActionButton>
 */


import React from "react";
import { Button } from "@mui/material";

const ActionButton = ({ onClick, children }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        ":hover": { backgroundColor: "#E6B635" },
        padding: 3,
        px: 5,
        borderRadius: "15px",
        backgroundColor: "#FFD700",
        fontSize: 15,
        pointerEvents: "auto",
      }}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
