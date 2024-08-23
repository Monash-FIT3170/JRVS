import { Box, Button, TextField } from "@mui/material";
import "./editComponents.css";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function EditTextBox({ heading, text, index, updateContent }) {
  const [headingChanged, setHeadingChanged] = useState(false);
  const [textChanged, setTextChanged] = useState(false);
  const [currentHeading, setCurrentHeading] = useState(heading);
  const [currentText, setCurrentText] = useState(text);

  const handleHeadingChange = (event) => {
    setCurrentHeading(event.target.value);
    if (event.target.value !== heading) setHeadingChanged(true);
    else setHeadingChanged(false);
  };

  const handleTextChange = (event) => {
    setCurrentText(event.target.value);
    if (event.target.value !== text) setTextChanged(true);
    else setTextChanged(false);
  };

  const handleSave = () => {
    updateContent(index, {
      type: "textBox",
      heading: currentHeading,
      text: currentText,
    });
    setHeadingChanged(false);
    setTextChanged(false);
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
        <h2 className="heading-font">{index + 1}. Text Only</h2>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <h2 className="text-font">Heading</h2>
        <TextField
          onChange={handleHeadingChange}
          fullWidth
          required
          variant="outlined"
          minRows={1}
          maxRows={3}
          defaultValue={heading || ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#F9F6EE",
              "& fieldset": { border: "0" },
              "&:hover": { backgroundColor: "#C0C0C0" },
              "&:hover fieldset:": { border: "0" },
              "&.Mui-focused fieldset": { border: "0" },
            },
            marginBottom: "20px",
            marginTop: "4px",
          }}
        />

        <h2 className="text-font">Text Content</h2>
        <TextField
          onChange={handleTextChange}
          fullWidth
          required
          multiline
          variant="outlined"
          rows={6}
          maxRows={6}
          defaultValue={text || ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#F9F6EE",
              "& fieldset": { border: "0" },
              "&:hover": { backgroundColor: "#C0C0C0" },
              "&:hover fieldset:": { border: "0" },
              "&.Mui-focused fieldset": { border: "0" },
            },
            marginTop: "4px",
          }}
        />
      </Box>
      <Box sx={{ padding: "20px" }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleSave}
          disabled={!headingChanged && !textChanged}
        >
          EDIT
        </Button>
      </Box>
    </Box>
  );
}
