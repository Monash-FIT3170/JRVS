import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  MenuItem,
  Menu,
  Grid,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LessonTypesPopup = ({ isOpen, onClose, onClick }) => {
  const [quizAnchorEl, setQuizAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleQuizClick = (event) => {
    setQuizAnchorEl(event.currentTarget);
  };

  const handleQuizClose = () => {
    setQuizAnchorEl(null);
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: 24,
            width: "300px",
            textAlign: "center",
            margin: "auto",
            marginTop: "10%",
            outline: "none",
          }}
        >
          <Typography
            variant="h6"
            sx={{ marginBottom: "15px", fontWeight: "bold", color: "#3CA3EE" }}
          >
            Create New Module
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  onClick("lesson");
                }} // hardcoded for testing
                sx={{
                  color: "#fff",
                  backgroundColor: "#3ca3ee",
                  borderColor: "#3ca3ee",
                  marginBottom: "10px",
                  borderRadius: "7px",
                  ":hover": {
                    backgroundColor: "#2196F3",
                    borderColor: "#2196F3",
                  },
                }}
              >
                Reading
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => onClick("video")}
                sx={{
                  color: "#fff",
                  backgroundColor: "#3ca3ee",
                  borderColor: "#3ca3ee",
                  marginBottom: "10px",
                  borderRadius: "7px",
                  ":hover": {
                    backgroundColor: "#2196F3",
                    borderColor: "#2196F3",
                  },
                }}
              >
                Video
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleQuizClick}
                sx={{
                  color: "#fff",
                  backgroundColor: "#3ca3ee",
                  borderColor: "#3ca3ee",
                  marginBottom: "10px",
                  borderRadius: "7px",
                  ":hover": {
                    backgroundColor: "#2196F3",
                    borderColor: "#2196F3",
                  },
                }}
              >
                Quiz
              </Button>
            </Grid>
          </Grid>
          <Menu
            anchorEl={quizAnchorEl}
            open={Boolean(quizAnchorEl)}
            onClose={handleQuizClose}
            sx={{ mt: 1 }}
          >
            {[
              "Multiple Choice",
              "Reorder",
              "Image",
              "True False",
              "Short Answer",
              "Drag And Drop",
            ].map((quizType, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  onClick("quiz", quizType.replace(/ /g, ""));
                }}
                sx={{
                  ":hover": {
                    backgroundColor: "#3CA3EE",
                    color: "white",
                  },
                }}
              >
                {quizType}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Modal>
    </>
  );
};

export default LessonTypesPopup;
