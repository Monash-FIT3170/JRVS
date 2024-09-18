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
import { MuiColorInput } from "mui-color-input";

const CreateUnitDialog = ({ open, onClose, onCreate }) => {
  const [unitName, setUnitName] = useState("");
  const [hexCode, setHexCode] = useState("#ffffff");
  const [icon, setIcon] = useState("");

  const handleHexCodeChange = (newValue) => {
    setHexCode(newValue);
  };

  const handleCreate = () => {
    // Pass the form data back to the parent component
    onCreate({ unitName, hexCode, icon });
    onClose();
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

          {/* MuiColorInput for Hex Code */}
          <MuiColorInput
            label="Hex Code"
            format="hex"
            fullWidth
            margin="normal"
            value={hexCode}
            onChange={handleHexCodeChange}
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
