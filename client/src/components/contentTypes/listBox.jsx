/**
 * @file ListBox.js
 * @description A React component for rendering a styled list with a heading. Utilizes Material-UI components for a clean and consistent design.
 * @module ListBox
 * @requires @mui/material/Typography
 * @requires @mui/material/Box
 * @requires React
 *
 * @param {Object} props - The component props.
 * @param {string} props.heading - The heading text to display above the list.
 * @param {string[]} props.points - An array of strings representing the list items to display.
 *
 * @returns {JSX.Element} The rendered ListBox component.
 *
 * @example
 * <ListBox
 *   heading="Features"
 *   points={["Feature 1", "Feature 2", "Feature 3"]}
 * />
 */

import React from "react";
import { Box } from "@mui/material";
import "./textBox.css";

export default function ListBox(props) {
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
      <h3 className="heading-font">{props.heading}</h3>
      <ul className="text-font" style={{ listStyleType: "disc" }}>
        {props.points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </Box>
  );
}
