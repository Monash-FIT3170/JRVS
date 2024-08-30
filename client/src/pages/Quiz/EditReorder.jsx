/**
 * @file EditReorderQuestion.js
 * @description This component provides an interface for editing and reordering questions in a quiz. It allows users to view, modify, reorder, add, and delete reorder-type quiz questions. The component fetches existing questions from an API, provides forms for editing each question, and handles form submissions to update the quiz. It also includes navigation, error handling, and status messages to ensure a smooth user experience.
 *
 * @module EditReorderQuestion
 * @requires AppBar, Box, Button, TextField, Toolbar, IconButton, Typography from @mui/material
 * @requires MenuBar from "../../components/MenuBar"
 * @requires useNavigate, useParams from react-router-dom
 * @requires useEffect, useState from React
 * @requires useApi from "../../context/ApiProvider"
 * @requires ArrowUpwardIcon, ArrowDownwardIcon, DeleteIcon, AddIcon, UndoIcon from "@mui/icons-material"
 * @requires ActionButton from "../../components/quizComponents/ActionButton"
 *
 * @example
 * // Example usage:
 * import EditReorderQuestion from './EditReorderQuestion';
 *
 * function App() {
 *   return <EditReorderQuestion />;
 * }
 *
 * @returns {JSX.Element} The rendered interface for editing and reordering reorder-type quiz questions, including forms for editing, adding new questions, and navigation buttons.
 */

import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  IconButton,
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
import ActionButton from "../../components/quizComponents/ActionButton";

const EditReorderQuestion = () => {
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

  const handleInputChange = (e, questionIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionsChange = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].wrongOptions[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionsChange = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOptions[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const moveOption = (questionIndex, optionIndex, direction) => {
    const updatedQuestions = [...questions];
    const options = updatedQuestions[questionIndex].wrongOptions;
    const [movedOption] = options.splice(optionIndex, 1);
    options.splice(optionIndex + direction, 0, movedOption);
    setQuestions(updatedQuestions);
  };

  const deleteOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    const wrongOptions = updatedQuestions[questionIndex].wrongOptions;
    wrongOptions.splice(optionIndex, 1);
    const correctOptions = updatedQuestions[questionIndex].correctOptions;
    correctOptions.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const moveCorrectOption = (questionIndex, optionIndex, direction) => {
    const updatedQuestions = [...questions];
    const options = updatedQuestions[questionIndex].correctOptions;
    const [movedOption] = options.splice(optionIndex, 1);
    options.splice(optionIndex + direction, 0, movedOption);
    setQuestions(updatedQuestions);
  };

  const moveQuestion = (questionIndex, direction) => {
    const updatedQuestions = [...questions];
    const [movedQuestion] = updatedQuestions.splice(questionIndex, 1);
    updatedQuestions.splice(questionIndex + direction, 0, movedQuestion);
    setQuestions(updatedQuestions);
  };

  const handlePointChange = (e, questionIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex][name] = parseFloat(value);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateData(`api/quizzes/${quizId}`, questions);
      console.log("All questions updated successfully");
      handleBackClick();
    } catch (error) {
      console.error("Failed to update the questions:", error);
      setError("Failed to update questions. Please try again.");
      setSuccessMessage("");
    }
  };

  const addNewQuestion = () => {
    const newQuestion = {
      questionText: "",
      correctOptions: [],
      type: "Reorder",
      wrongOptions: [],
      points: 0,
    };
    console.log("Adding new question:", newQuestion);
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const revertQuestion = (index) => {
    const updatedQuestions = [...questions];
    if (index >= 0 && index < originalQuestions.length) {
      updatedQuestions[index] = JSON.parse(
        JSON.stringify(originalQuestions[index]),
      );
    } else {
      updatedQuestions[index] = {
        questionText: "",
        type: "Reorder",
        correctOptions: [""],
        wrongOptions: [""],
        points: 0,
      };
    }

    setQuestions(updatedQuestions);
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
            marginTop: "20px",
          }}
        >
          Edit Reorder Quiz
        </Typography>
        {!isLoading &&
          questions.map((question, questionIndex) => (
            <Box
              key={question._id}
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
                  width: "75%",
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
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "48px",
                        fontWeight: "600",
                        color: "#FFFFFF",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {questionIndex + 1} | Reorder
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      onClick={() => moveQuestion(questionIndex, -1)}
                      disabled={questionIndex === 0}
                    >
                      <ArrowUpwardIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      onClick={() => moveQuestion(questionIndex, 1)}
                      disabled={questionIndex === questions.length - 1}
                    >
                      <ArrowDownwardIcon fontSize="large" />
                    </IconButton>
                    <IconButton onClick={() => deleteQuestion(questionIndex)}>
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      onClick={() => revertQuestion(questionIndex)}
                      aria-label="Revert question"
                    >
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
                  onChange={(e) => handleInputChange(e, questionIndex)}
                  multiline
                  minRows={4}
                  sx={{
                    width: "100%",
                    marginBottom: "20px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#EFEFEF",
                    },
                  }}
                />

                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#FFFFFF",
                  }}
                >
                  Question order
                </Typography>
                {question.wrongOptions &&
                  question.wrongOptions.map((option, optionIndex) => (
                    <Box
                      key={optionIndex}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginY: "10px",
                      }}
                    >
                      <TextField
                        variant="filled"
                        label={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionsChange(e, questionIndex, optionIndex)
                        }
                        sx={{
                          width: "100%",

                          backgroundColor: "white",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#EFEFEF",
                          },
                        }}
                      />
                      <IconButton
                        onClick={() =>
                          moveOption(questionIndex, optionIndex, -1)
                        }
                        disabled={optionIndex === 0}
                      >
                        <ArrowUpwardIcon fontSize="large" />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          moveOption(questionIndex, optionIndex, 1)
                        }
                        disabled={
                          optionIndex === question.wrongOptions.length - 1
                        }
                      >
                        <ArrowDownwardIcon fontSize="large" />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          deleteOption(questionIndex, optionIndex, 1)
                        }
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    </Box>
                  ))}
                <br></br>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#FFFFFF",
                  }}
                >
                  Answer order
                </Typography>
                {question.correctOptions &&
                  question.correctOptions.map((option, optionIndex) => (
                    <Box
                      key={optionIndex}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginY: "10px",
                      }}
                    >
                      <TextField
                        variant="filled"
                        label={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleCorrectOptionsChange(
                            e,
                            questionIndex,
                            optionIndex,
                          )
                        }
                        sx={{
                          width: "100%",

                          backgroundColor: "white",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#EFEFEF",
                          },
                        }}
                      />
                      <IconButton
                        onClick={() =>
                          moveCorrectOption(questionIndex, optionIndex, -1)
                        }
                        disabled={optionIndex === 0}
                      >
                        <ArrowUpwardIcon fontSize="large" />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          moveCorrectOption(questionIndex, optionIndex, 1)
                        }
                        disabled={
                          optionIndex === question.correctOptions.length - 1
                        }
                      >
                        <ArrowDownwardIcon fontSize="large" />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          deleteOption(questionIndex, optionIndex, 1)
                        }
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    </Box>
                  ))}
                <br></br>
                <TextField
                  required
                  variant="filled"
                  label="Points"
                  name="points"
                  value={question.points}
                  onChange={(e) => handlePointChange(e, questionIndex)}
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

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[questionIndex].wrongOptions.push("");
                    updatedQuestions[questionIndex].correctOptions.push("");
                    setQuestions(updatedQuestions);
                  }}
                  sx={{
                    marginTop: "20px",
                    backgroundColor: "#FFC93C",
                    ":hover": { backgroundColor: "#F7B92C" },
                    padding: "14px",
                    border: "20px",
                  }}
                >
                  Add Option
                </Button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {successMessage && (
                  <p style={{ color: "green" }}>{successMessage}</p>
                )}
              </Box>
            </Box>
          ))}
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
            }}
          >
            <ActionButton onClick={handleBackClick}>Back</ActionButton>
            <Button
              onClick={addNewQuestion}
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                marginBottom: "20px",
                backgroundColor: "#FFC93C",
                ":hover": { backgroundColor: "#F7B92C" },
                pointerEvents: "auto",
                padding: "14px",
              }}
            >
              Add Question
            </Button>
            <ActionButton onClick={handleSubmit}>Save</ActionButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default EditReorderQuestion;
