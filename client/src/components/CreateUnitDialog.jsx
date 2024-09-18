import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from "@mui/icons-material/Favorite";

const iconList = {
  search: <SearchIcon />,
  home: <HomeIcon />,
  school: <SchoolIcon />,
  favorite: <FavoriteIcon />,
};

const CreateUnitDialog = ({ open, onClose, onCreate }) => {
  const [unitName, setUnitName] = useState("");
  const [hexCode, setHexCode] = useState("#ffffff");
  const [icon, setIcon] = useState("search");

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
      <DialogTitle
        style={{
          color: "#3ca3ee",
          fontSize: "26px",
          fontWeight: "bold",
          textAlign: "center",
          margin: "10px 0",
        }}
      >
        Create a new unit
      </DialogTitle>
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

          {/* Custom icon selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="icon-select-label">Icon</InputLabel>
            <Select
              labelId="icon-select-label"
              id="icon-select"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            >
              {Object.keys(iconList).map((iconKey) => (
                <MenuItem key={iconKey} value={iconKey}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {iconList[iconKey]}
                    <Box sx={{ width: 8 }} />{" "}
                    {/* Space between icon and text */}
                    {iconKey.charAt(0).toUpperCase() + iconKey.slice(1)}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          style={{
            marginRight: "20px",
            marginBottom: "15px",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "10px",
            whiteSpace: "nowrap",
            border: "2px solid #3ca3ee",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          style={{
            marginRight: "20px",
            marginBottom: "15px",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "10px",
            whiteSpace: "nowrap",
            backgroundColor: "#3ca3ee",
            color: "#fff",
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUnitDialog;
