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
import CloseIcon from "@mui/icons-material/Close";

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
      <DialogTitle style={{ marginLeft: "10px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
          }}
        >
          {/* Title */}
          <span
            style={{
              color: "#3ca3ee",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Create a new unit
          </span>

          {/* Close button in top-right corner */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            style={{ margin: "12px" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          marginLeft="30px"
          marginRight="30px"
        >
          {/* Unit title input */}
          <TextField
            label="Unit Name"
            fullWidth
            margin="normal"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
          />

          {/* MUI colour input for hex code */}
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
              label="Icon"
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

      <DialogActions
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "16px 24px",
        }}
      >
        {/* Create button */}
        <Button
          onClick={handleCreate}
          style={{
            marginTop: "-20px",
            marginBottom: "5px",
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
