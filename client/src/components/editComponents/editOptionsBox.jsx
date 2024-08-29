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
