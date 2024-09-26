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
import CloseIcon from "@mui/icons-material/Close";
import Icon from "@mui/material/Icon";
// Icons
import SearchIcon from "@mui/icons-material/Search";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import MemoryIcon from "@mui/icons-material/Memory";
import BarChartIcon from "@mui/icons-material/BarChart";
import BalanceIcon from "@mui/icons-material/Balance";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import CloudIcon from "@mui/icons-material/Cloud";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ConstructionIcon from "@mui/icons-material/Construction";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HomeIcon from "@mui/icons-material/Home";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

const iconList = {
  search: <SearchIcon />,
  tips_and_updates: <TipsAndUpdatesIcon />,
  memory: <MemoryIcon />,
  bar_chart: <BarChartIcon />,
  balance: <BalanceIcon />,
  people_alt: <PeopleAltIcon />,
  rocket_launch: <RocketLaunchIcon />,
  cloud: <CloudIcon />,
  psychology: <PsychologyIcon />,
  local_see: <LocalSeeIcon />,
  construction: <ConstructionIcon />,
  monetization_on: <MonetizationOnIcon />,
  fitness_center: <FitnessCenterIcon />,
  home: <HomeIcon />,
  auto_fix_high_icon: <AutoFixHighIcon />,
  qr_code_2: <QrCode2Icon />,
  ads_click: <AdsClickIcon />,
  alt_route: <AltRouteIcon />,
  query_stats: <QueryStatsIcon />,
  photo_camera_back: <PhotoCameraBackIcon />,
  access_time_filled: <AccessTimeFilledIcon />,
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
      <DialogTitle style={{ marginLeft: "10px", marginBottom: "-20px" }}>
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
                    maxHeight: 300, // Limit the dropdown height
                  },
                },
              }}
            >
              {Object.keys(iconList).map((iconKey) => (
                <MenuItem key={iconKey} value={iconKey}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {iconList[iconKey]}
                    <Box sx={{ width: 8 }} />
                    {/* Space between icon and text */}
                    {
                      iconKey.charAt(0).toUpperCase() +
                        iconKey
                          .slice(1)
                          .replace(/_/g, " ") /* Make text more readable */
                    }
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
