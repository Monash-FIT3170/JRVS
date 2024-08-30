/**
 * @file editTrueFalse.js
 * @description This component provides an interface for editing True/False quiz questions within a specific quiz. It allows users to view, modify, reorder, delete, and add new True/False questions. The component fetches existing questions from an API, provides forms for editing each question, and handles form submissions to update the quiz. It also provides navigation and error handling to ensure the user can easily manage the quiz questions.
 *
 * @module editTrueFalse
 * @requires AppBar, Box, Button, TextField, Toolbar, IconButton, InputLabel, MenuItem, FormControl, Select, Typography from @mui/material
 * @requires MenuBar from "../../components/MenuBar"
 * @requires useNavigate, useParams from react-router-dom
 * @requires useEffect, useState from React
 * @requires useApi from "../../context/ApiProvider"
 * @requires ArrowUpwardIcon, ArrowDownwardIcon, DeleteIcon, AddIcon, UndoIcon from "@mui/icons-material"
 *
 * @example
 * // Example usage:
 * import editTrueFalse from './editTrueFalse';
 *
 * function App() {
 *   return <editTrueFalse />;
 * }
 *
 * @returns {JSX.Element} The rendered interface for editing True/False quiz questions, including forms for editing, adding new questions, and navigation buttons.
 */

import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@mui/material";
import MenuBar from "../../components/MenuBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../../context/ApiProvider";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import UndoIcon from "@mui/icons-material/Undo";

const EditTrueFalse = () => {
  const navigate = useNavigate();
  const { getData, updateData } = useApi();
  const [questions, setQuestions] = useState([]);
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { quizId } = useParams();
  const [successMessage, setSuccessMessage] = useState("");

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quiz = await getData(`api/quizzes/${quizId}`);
        if (quiz.questions) {
          setQuestions(quiz.questions);
          setOriginalQuestions(JSON.parse(JSON.stringify(quiz.questions)));
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getData, quizId]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  const handlePointChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = parseFloat(value);
    setQuestions(updatedQuestions);
  };

  const isFormComplete = () => {
    return questions.every(
      (question) =>
        question &&
        question.questionText &&
        question.questionText.trim() !== "" &&
        question.answer &&
        question.answer !== "",
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormComplete()) {
      try {
        await updateData(`api/quizzes/${quizId}`, questions);
      } catch (error) {
        setError("Failed to update questions. Please try again.");
      }
    } else {
      setError("Please fill out all fields before saving.");
      setSuccessMessage("");
    }
    navigate(-1);
  };

  const addNewQuestion = () => {
    const newQuestion = {
      questionText: "",
      answer: "",
      type: "TrueFalse", // Set the default type
      options: [
        { option: "True", value: "true" },
        { option: "False", value: "false" },
      ],
      points: 0,
    };
    console.log("Adding new question:", newQuestion); // Debugging statement
    setQuestions([...questions, newQuestion]);
  };

  const moveQuestion = (index, direction) => {
    const updatedQuestions = [...questions];
    const [movedQuestion] = updatedQuestions.splice(index, 1);
    updatedQuestions.splice(index + direction, 0, movedQuestion);
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const revertQuestion = (index) => {
    const updatedQuestions = [...questions];
    if (index >= 0 && index < originalQuestions.length) {
      updatedQuestions[index] = { ...originalQuestions[index] };
      setQuestions(updatedQuestions);
    } else {
      const updatedQuestions = [...questions];
      updatedQuestions[index] = {
        questionText: "",
        answer: "",
        type: "TrueFalse",
        options: [
          { option: "True", value: "true" },
          { option: "False", value: "false" },
        ],
        points: 0,
      };
      setQuestions(updatedQuestions);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "100vw",
        backgroundColor: "#3CA3EE",
      }}
    >
      <Box sx={{ padding: "10px" }}>
        <MenuBar />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "white",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "1000px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "36px",
              fontWeight: "700",
              color: "#333",
              marginBottom: "20px",
              letterSpacing: "0.5px",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            Edit True or False Quiz
          </Typography>

          {!isLoading &&
            questions.map((question, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  overflow: "auto",
                  marginBottom: "40px",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "15px",
                    backgroundColor: "#6AB6F3",
                    width: "90%",
                    padding: "30px",
                    position: "relative",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Box
                    sx={{
                      marginBottom: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "36px",
                        fontWeight: "600",
                        color: "#FFFFFF",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {index + 1} True Or False {""}
                    </Typography>
                    <Box>
                      <IconButton
                        onClick={() => moveQuestion(index, -1)}
                        disabled={index === 0}
                      >
                        <ArrowUpwardIcon fontSize="large" />
                      </IconButton>
                      <IconButton
                        onClick={() => moveQuestion(index, 1)}
                        disabled={index === questions.length - 1}
                      >
                        <ArrowDownwardIcon fontSize="large" />
                      </IconButton>
                      <IconButton onClick={() => deleteQuestion(index)}>
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                      <IconButton onClick={() => revertQuestion(index)}>
                        <UndoIcon fontSize="large" />
                      </IconButton>
                    </Box>
                  </Box>

                  <TextField
                    required
                    variant="filled"
                    label="Question Text"
                    name="questionText"
                    value={question.questionText}
                    onChange={(e) => handleInputChange(e, index)}
                    multiline
                    minRows={4}
                    sx={{
                      width: "100%",

                      backgroundColor: "white",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#EFEFEF",
                      },
                      marginBottom: "20px",
                    }}
                  />
                  <FormControl
                    required
                    variant="filled"
                    sx={{ width: "100%", marginBottom: "20px" }}
                  >
                    <InputLabel
                      sx={{
                        backgroundColor: "#3CA3EE",
                        color: "black",
                        padding: "0 5px",
                        borderRadius: "5px",
                      }}
                    >
                      Answer
                    </InputLabel>
                    <Select
                      label="Answer"
                      name="answer"
                      value={question.answer}
                      onChange={(e) => handleInputChange(e, index)}
                      sx={{
                        width: "100%",

                        backgroundColor: "white",
                        borderRadius: "10px",

                        "&:hover": {
                          backgroundColor: "#EFEFEF",
                        },

                        "&.Mui-focused": {
                          backgroundColor: "white", // Background when focused
                        },
                        "& .MuiSelect-icon": {
                          color: "#333", // Icon color if needed
                        },
                      }}
                    >
                      <MenuItem value="true">True</MenuItem>
                      <MenuItem value="false">False</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    required
                    variant="filled"
                    label="Points"
                    name="points"
                    value={question.points}
                    onChange={(e) => handlePointChange(e, index)}
                    inputProps={{
                      min: "0",
                      type: "number",
                    }}
                    sx={{
                      width: "100%",

                      backgroundColor: "white",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#EFEFEF",
                      },
                    }}
                  />

                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {successMessage && (
                    <p style={{ color: "green" }}>{successMessage}</p>
                  )}
                </Box>
              </Box>
            ))}
        </Box>
      </Box>

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: "auto",
          bottom: 0,
          bgcolor: "transparent",
          height: "100px",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "60px",
            }}
          >
            <Button
              onClick={handleBackClick}
              variant="contained"
              className="button-font"
              sx={{
                ":hover": { backgroundColor: "#2196F3" },
                marginLeft: "20px",
                marginBottom: "60px",
                padding: "15px",
                borderRadius: "15px",
                backgroundColor: "#FFC93C",
                pointerEvents: "auto",
              }}
            >
              Back
            </Button>
            <Button
              onClick={addNewQuestion}
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                marginBottom: "60px",
                backgroundColor: "#FFC93C",
                pointerEvents: "auto",
                ":hover": { backgroundColor: "#F7B92C" },
              }}
            >
              Add Question
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                ":hover": { backgroundColor: "#2196F3" },
                marginRight: "20px",
                marginBottom: "60px",
                padding: "15px",
                borderRadius: "15px",
                backgroundColor: "#FFC93C",
                pointerEvents: "auto",
              }}
              disabled={!isFormComplete()}
            >
              Save
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default EditTrueFalse;
