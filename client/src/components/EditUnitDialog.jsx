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
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Icon from "@mui/material/Icon";

// Icon list
const iconList = [
  "search",
  "tips_and_updates",
  "memory",
  "bar_chart",
  "balance",
  "people_alt",
  "rocket_launch",
  "cloud",
  "psychology",
  "local_see",
  "construction",
  "monetization_on",
  "fitness_center",
  "home",
  "auto_fix_high",
  "qr_code_2",
  "ads_click",
  "alt_route",
  "query_stats",
  "photo_camera_back",
  "access_time_filled",
];

const EditUnitDialog = ({ open, onClose, onSave, existingUnit }) => {
  const [unitName, setUnitName] = useState(existingUnit?.unitName || "");
  const [hexCode, setHexCode] = useState(existingUnit?.hexCode || "#ffffff");
  const [icon, setIcon] = useState(existingUnit?.icon || "search");

  const handleSave = () => {
    // Pass the updated form data back to the parent component
    onSave({ unitName, hexCode, icon });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{ marginLeft: "10px", marginBottom: "-20px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
          }}
        >
          {/* Title updated to reflect editing */}
          <span
            style={{
              color: "#3ca3ee",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Edit Unit
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
        <Box component="form" noValidate autoComplete="off" marginX="30px">
          <TextField
            label="Unit Name"
            fullWidth
            margin="normal"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
          />

          {/* Display color input with hex code and color preview */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <TextField
              label="Hex Code"
              fullWidth
              value={hexCode}
              onChange={(e) => setHexCode(e.target.value)}
              InputProps={{
                inputProps: {
                  type: "color",
                },
              }}
            />

            {/* Show the hex code */}
            <Typography variant="body1">{hexCode}</Typography>
          </Box>

          {/* Custom icon selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="icon-select-label" shrink>
              Icon
            </InputLabel>
            <Select
              labelId="icon-select-label"
              id="icon-select"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              label="Icon"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              {/* Icon selection directly in the Select menu */}
              {iconList.map((iconName) => (
                <MenuItem key={iconName} value={iconName}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Icon>{iconName}</Icon>
                    <span style={{ marginLeft: "8px" }}>{iconName}</span>
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
        {/* Save button */}
        <Button
          onClick={handleSave}
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUnitDialog;
