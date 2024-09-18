/**
 * @file CreateUnitDialog Component
 *
 * @description A modal dialog component to create a new unit. It contains input fields for the unit's name, description, hex code, and icon.
 *
 * @module CreateUnitDialog
 * @requires React
 * @requires @mui/material/Dialog
 * @requires @mui/material/DialogTitle
 * @requires @mui/material/DialogContent
 * @requires @mui/material/DialogActions
 * @requires @mui/material/Button
 * @requires @mui/material/TextField
 *
 * @returns {JSX.Element} The rendered CreateUnitDialog component
 */

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

const CreateUnitDialog = ({ open, onClose, onCreate }) => {
  const [unitName, setUnitName] = useState("");
  const [hexCode, setHexCode] = useState("");
  const [icon, setIcon] = useState("");

  const handleCreate = () => {
    // Pass the form data back to the parent component
    onCreate({ unitName, hexCode, icon });
    onClose(); // Close the dialog after creating the unit
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create a new unit</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Unit Name"
            fullWidth
            margin="normal"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
          />
          <TextField
            label="Hex Code"
            fullWidth
            margin="normal"
            value={hexCode}
            onChange={(e) => setHexCode(e.target.value)}
          />
          <TextField
            label="Icon"
            fullWidth
            margin="normal"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUnitDialog;
