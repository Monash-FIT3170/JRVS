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

import React from "react";
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

const EditReorderQuestion = () => {
  const navigate = useNavigate();
  const { getData, updateData, postData } = useApi();
  const [questions, setQuestions] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentHeading, setCurrentHeading] = useState("");
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { quizId, unitId } = useParams();
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
        setCurrentTitle(quiz.title || "");
        setCurrentHeading(quiz.heading || "");
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
      await updateData(`api/quizzes/${quizId}`, {
        title: currentTitle,
        heading: currentHeading,
        questions: questions,
      });
      console.log("All questions updated successfully");
      handleBackClick();
    } catch (error) {
      console.error("Failed to update the questions:", error);
      setError("Failed to update questions. Please try again.");
      setSuccessMessage("");
    }

    // edit node title and desc
    try {
      await postData(`api/units/${unitId}/updateNodeDetails`, {
        unitId: unitId,
        nodeId: quizId,
        newTitle: currentTitle,
        newDescription: currentHeading,
      });
    } catch (error) {
      console.log(error);
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
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        overflow: "auto",
      }}
    >
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <MenuBar />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "white",

          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "1300px",
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
            Edit Reorder Quiz
          </Typography>

          <Box
            sx={{
              borderRadius: "15px",
              backgroundColor: "#6AB6F3",
              width: "50%",
              padding: "30px",
              position: "relative",
              marginBottom: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Box sx={{ marginBottom: "40px" }}>
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
                Title
              </Typography>
            </Box>
            <TextField
              onChange={(e) => setCurrentTitle(e.target.value)}
              required
              multiline
              minRows={1}
              maxRows={2}
              variant="filled"
              label="Title"
              value={currentTitle || ""}
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
            <h2 className="text-font">Heading</h2>
            <TextField
              onChange={(e) => setCurrentHeading(e.target.value)}
              required
              multiline
              minRows={1}
              maxRows={2}
              variant="filled"
              label="Heading"
              value={currentHeading || ""}
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
          </Box>

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
                    <Box>
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
                      textDecoration: "underline",
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
                      textDecoration: "underline",
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
                      marginY: "20px",
                      backgroundColor: "#FFC93C",
                      ":hover": { backgroundColor: "#F7B92C" },
                      padding: "14px",
                      border: "20px",
                    }}
                  >
                    Add Option
                  </Button>
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
                      width: "40%",
                      display: "flex",
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
            }}
          >
            <Button
              onClick={handleBackClick}
              variant="contained"
              className="button-font"
              sx={{
                ":hover": { backgroundColor: "#F7B92C" },
                marginLeft: "20px",
                marginBottom: "60px",
                padding: "20px",
                borderRadius: "15px",
                backgroundColor: "#FFC93C",
                pointerEvents: "auto",
                paddingX: "30px",
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
                borderRadius: "10px",
                padding: "14px",
              }}
            >
              Add Question
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              className="button-font"
              sx={{
                ":hover": { backgroundColor: "#F7B92C" },
                marginRight: "20px",
                marginBottom: "60px",
                padding: "20px",
                borderRadius: "15px",
                backgroundColor: "#FFC93C",
                pointerEvents: "auto",
                paddingX: "30px",
              }}
            >
              Save
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default EditReorderQuestion;
