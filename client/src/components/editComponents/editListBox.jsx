import { Box, Button, IconButton, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import "./editComponents.css";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function EditListBox({ heading, points, index, updateContent }) {
  const [headingChanged, setHeadingChanged] = useState(false);
  const [pointsChanged, setPointsChanged] = useState(false);
  const [currentHeading, setCurrentHeading] = useState(heading);
  const [currentPoints, setCurrentPoints] = useState(points);

  const handleHeadingChange = (event) => {
    setCurrentHeading(event.target.value);
    if (event.target.value !== heading) setHeadingChanged(true);
    else setHeadingChanged(false);
  };

  const handlePointChange = (event, index) => {
    if (event.target.value !== points[index]) {
      setPointsChanged(true);
      const updatedPoints = currentPoints.map((point, i) =>
        i === index ? event.target.value : point,
      );
      setCurrentPoints(updatedPoints);
    } else setPointsChanged(false);
  };

  const handlePointsAdd = () => {
    const newPoint = "";
    setCurrentPoints([...currentPoints, newPoint]);
    setPointsChanged(true);
  };

  const handlePointsRemove = () => {
    setCurrentPoints(currentPoints.slice(0, -1));
    setPointsChanged(true);
  };

  const handleSave = () => {
    updateContent(index, {
      type: "listBox",
      heading: currentHeading,
      points: currentPoints,
    });
    setHeadingChanged(false);
    setPointsChanged(false);
  };

  return (
    <Box
      sx={{
        bgcolor: "#3CA3EE",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        width: "50%",
        borderRadius: "5px",
        marginBottom: "20px",
        marginLeft: "70px",
      }}
    >
      <Box sx={{ padding: "20px" }}>
        <h2 className="heading-font">{index + 1}. List</h2>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <h2 className="text-font">Heading</h2>
        <TextField
          fullWidth
          onChange={handleHeadingChange}
          required
          multiline
          minRows={1}
          maxRows={3}
          variant="outlined"
          defaultValue={heading || ""}
          sx={{ marginBottom: "20px", marginTop: "4px" }}
        />

        <h2 className="text-font">List Items</h2>
        {currentPoints &&
          currentPoints.map((point, index) => (
            <TextField
              onChange={(event) => handlePointChange(event, index)}
              fullWidth
              multiline
              variant="outlined"
              label={"Point " + (index + 1)}
              minRows={1}
              maxRows={3}
              defaultValue={point}
              sx={{ marginTop: "10px" }}
              key={index}
            />
          ))}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "8px",
          }}
        >
          {currentPoints && currentPoints.length > 0 && (
            <IconButton onClick={handlePointsRemove}>
              <RemoveCircleIcon sx={{ color: "black" }} />
            </IconButton>
          )}
          <IconButton onClick={handlePointsAdd}>
            <AddCircleIcon sx={{ color: "black" }} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleSave}
          disabled={!headingChanged && !pointsChanged}
        >
          EDIT
        </Button>
      </Box>
    </Box>
  );
}
