/**
 * @file editMultipleChoice.js
 * @description This component provides an interface for editing and managing multiple-choice quiz questions within a specific quiz. It allows users to view, modify, reorder, add, and delete multiple-choice questions. The component fetches existing questions from an API, provides forms for editing each question, and handles form submissions to update the quiz. It also includes functionality for adding new questions, moving questions up and down, deleting questions, and reverting changes. Navigation and error handling are integrated to ensure a smooth user experience.
 *
 * @module editMultipleChoice
 * @requires AppBar, Box, Button, TextField, Toolbar, IconButton, Typography, FormControlLabel, Radio from @mui/material
 * @requires MenuBar from "../../components/MenuBar"
 * @requires useNavigate, useParams from react-router-dom
 * @requires useEffect, useState from React
 * @requires useApi from "../../context/ApiProvider"
 * @requires ArrowUpwardIcon, ArrowDownwardIcon, DeleteIcon, AddIcon, UndoIcon from "@mui/icons-material"
 *
 * @example
 * // Example usage:
 * import editMultipleChoice from './editMultipleChoice';
 *
 * function App() {
 *   return <editMultipleChoice />;
 * }
 *
 * @returns {JSX.Element} The rendered interface for editing multiple-choice quiz questions, including forms for editing, adding new questions, and navigation buttons.
 */

import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  IconButton,
  Typography,
  FormControlLabel,
  Radio,
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

const EditMultipleChoice = () => {
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
      console.log(originalQuestions);
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

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = {
      option: value,
      value: value,
    };
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push({ option: "", value: "" });
    setQuestions(updatedQuestions);
    console.log(questions);
  };

  const deleteOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const isFormComplete = () => {
    return questions.every(
      (question) =>
        question &&
        question.questionText &&
        question.questionText.trim() !== "" &&
        question.answer &&
        question.answer.trim() !== "" &&
        question.options.every(
          (option) => option && option.option && option.option.trim() !== "",
        ),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormComplete()) {
      try {
        await updateData(`api/quizzes/${quizId}`, {
          title: currentTitle,
          heading: currentHeading,
          questions: questions,
        });
      } catch (error) {
        setError("Failed to update questions. Please try again.");
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
      type: "MultipleChoice", // Set the default type
      options: [{ option: "", value: "" }],
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
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
    }
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
        type: "MultipleChoice",
        options: [{ option: "", value: "" }],
        points: 0,
      };
      setQuestions(updatedQuestions);
    }
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
          backgroundColor: "white",

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
            Edit Multiple Choice Quiz
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
                        fontSize: "48px",
                        fontWeight: "600",
                        color: "#FFFFFF",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {index + 1} | Multiple Choice{" "}
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
                    variant="outlined"
                    label="Question Text"
                    name="questionText"
                    value={question.questionText}
                    onChange={(e) => handleInputChange(e, index)}
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
                  {question.options.map((option, optionIndex) => (
                    <Box
                      key={optionIndex}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <TextField
                        required
                        variant="outlined"
                        label={`Option ${optionIndex + 1}`}
                        value={question.options[optionIndex].option}
                        onChange={(e) =>
                          handleOptionChange(e, index, optionIndex)
                        }
                        multiline
                        minRows={1}
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
                        onClick={() => deleteOption(index, optionIndex)}
                        sx={{ marginLeft: "10px" }}
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>

                      <FormControlLabel
                        control={
                          <Radio
                            checked={
                              question.answer === option.value &&
                              option.value.trim() !== ""
                            }
                            onChange={() => {
                              handleInputChange(
                                {
                                  target: {
                                    name: "answer",
                                    value: option.value,
                                  },
                                },
                                index,
                              );
                            }}
                            sx={{
                              color: "#black",
                              "&.Mui-checked": { color: "#000" },
                              "& .MuiSvgIcon-root": {
                                borderRadius: "50%",
                                width: "24px",
                                height: "24px",
                                padding: "4px",
                              },
                            }}
                          />
                        }
                        label={
                          <Typography variant="subtitle1">Answer?</Typography>
                        }
                        sx={{
                          marginLeft: "10px",
                          "& .MuiFormControlLabel-label": {
                            color: "#000",
                          },
                        }}
                      />
                    </Box>
                  ))}
                  <Button
                    onClick={() => addOption(index)}
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                      marginY: "20px",
                      backgroundColor: "#FFC93C",
                      ":hover": { backgroundColor: "#F7B92C" },
                      padding: "14px",
                      border: "20px",
                    }}
                  >
                    Add Options
                  </Button>

                  <TextField
                    required
                    variant="outlined"
                    label="Points"
                    name="points"
                    value={question.points}
                    onChange={(e) => handlePointChange(e, index)}
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      marginTop: "30px",
                    }}
                  ></Box>
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
                ":hover": { backgroundColor: "#F7B92C" },
                marginLeft: "20px",
                marginBottom: "60px",
                padding: "20px",
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
                borderRadius: "10px",
                padding: "14px",
              }}
            >
              Add Question
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
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

export default EditMultipleChoice;
