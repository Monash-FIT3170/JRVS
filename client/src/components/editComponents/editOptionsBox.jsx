/**
 * @file editOptionsBox.js
 * @description A component providing action buttons for managing content items. It includes buttons for deleting an item, and moving an item up or down within a list. The buttons are styled using Material-UI components and icons for a clean and functional UI.
 * @module editOptionsBox
 * @requires @mui/material/Box
 * @requires @mui/material/Button
 * @requires @mui/icons-material/Delete
 * @requires @mui/icons-material/KeyboardArrowDown
 * @requires @mui/icons-material/KeyboardArrowUp
 * @param {Object} props - Component properties.
 * @param {Function} props.deleteContent - Callback function to delete the item. Receives the index of the item to delete.
 * @param {Function} props.moveUp - Callback function to move the item up in the list. Receives the index of the item to move.
 * @param {Function} props.moveDown - Callback function to move the item down in the list. Receives the index of the item to move.
 * @param {number} props.index - The index of the current itehffm within the list, used for identifying which item to delete or move.
 * @returns {JSX.Element} A Box component containing buttons for deleting, moving up, and moving down an item.
 * @example
 * // Example usage of editOptionsBox
 * <editOptionsBox
 *   deleteContent={(index) => console.log("Delete item at index", index)}
 *   moveUp={(index) => console.log("Move item at index", index, "up")}
 *   moveDown={(index) => console.log("Move item at index", index, "down")}
 *   index={0}
 * />
 */

import React from "react";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function EditOptionsBox({
  deleteContent,
  moveUp,
  moveDown,
  index,
}) {
  return (
    <Box
      sx={{
        marginLeft: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        onClick={() => deleteContent(index)}
        variant="outlined"
        sx={{
          marginBottom: "10px",
          bgcolor: "#F88379",
          borderWidth: 0,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
          width: "60px",
          height: "60px",
        }}
      >
        <DeleteIcon sx={{ color: "black" }} />
      </Button>
      <Button
        onClick={() => moveUp(index)}
        variant="outlined"
        sx={{
          marginBottom: "10px",
          bgcolor: "#C0C0C0",
          borderWidth: 0,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
          width: "60px",
          height: "60px",
        }}
      >
        <KeyboardArrowUpIcon sx={{ color: "black" }} />
      </Button>
      <Button
        onClick={() => moveDown(index)}
        variant="outlined"
        sx={{
          marginBottom: "10px",
          bgcolor: "#C0C0C0",
          borderWidth: 0,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
          width: "60px",
          height: "60px",
        }}
      >
        <KeyboardArrowDownIcon sx={{ color: "black" }} />
      </Button>
    </Box>
  );
}
