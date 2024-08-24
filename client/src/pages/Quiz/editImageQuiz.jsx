import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  IconButton,
  Typography,
  Checkbox,
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

const EditImageQuiz = () => {
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
      } catch (error) {
        setError("Failed to fetch quiz data. Please try again.");
      } finally {
        setIsLoading(false);
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

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    const updatedQuestions = [...questions];

    updatedQuestions[questionIndex].options[optionIndex] = {
      option: value,
      value: value,
    };

    setQuestions(updatedQuestions);
  };

  const isFormComplete = () => {
    return questions.every(
      (question) =>
        question.questionText.trim() !== "" && question.answer.trim() !== "",
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormComplete()) {
      try {
        await updateData(`api/quizzes/${quizId}`, questions);
        setSuccessMessage("Questions updated successfully!");
        setError("");
      } catch (error) {
        console.error("Failed to update the questions:", error);
        setError("Failed to update questions. Please try again.");
        setSuccessMessage("");
      }
    } else {
      setError("Please fill out all fields before saving.");
      setSuccessMessage("");
    }

    handleBackClick();
  };

  const addNewQuestion = () => {
    const newQuestion = {
      questionText: "",
      answer: "",
      type: "ImageQuiz",
      options: [
        { option: "", value: "" },
        { option: "", value: "" },
      ],
      image: "",
    };
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
    } else {
      updatedQuestions[index] = {
        questionText: "",
        answer: "",
        type: "ImageQuiz",
        options: [
          { option: "", value: "" },
          { option: "", value: "" },
        ],
        image: "",
      };
    }
    setQuestions(updatedQuestions);
  };

  const addOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push({ option: "", value: "" });
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = updatedQuestions[
      questionIndex
    ].options.filter((_, i) => i !== optionIndex);
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
      <MenuBar />
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "60px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "1100px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ paddingBottom: "25px", color: "#333" }}
          >
            Edit Image Quiz
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
                  marginBottom: "20px",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "5px",
                    backgroundColor: "#3CA3EE",
                    borderWidth: "2px",
                    borderColor: "#3CA3EE",
                    width: "90%",
                    padding: "20px",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      marginBottom: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3 className="heading-font">
                      {index + 1} | Image Question
                    </h3>
                    <Box>
                      <IconButton
                        onClick={() => moveQuestion(index, -1)}
                        disabled={index === 0}
                        aria-label="Move question up"
                      >
                        <ArrowUpwardIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => moveQuestion(index, 1)}
                        disabled={index === questions.length - 1}
                        aria-label="Move question down"
                      >
                        <ArrowDownwardIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteQuestion(index)}
                        aria-label="Delete question"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => revertQuestion(index)}
                        aria-label="Revert question"
                      >
                        <UndoIcon />
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
                    fullWidth
                    sx={{
                      width: "100%",
                      marginBottom: "20px",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#F9F6EE",
                        "& fieldset": { borderColor: "black" },
                        "&:hover": { backgroundColor: "#C0C0C0" },
                        "&:hover fieldset:": { borderColor: "black" },
                        "&.Mui-focused fieldset": { borderColor: "black" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "black",
                        backgroundColor: "#3CA3EE",
                        borderRadius: "5px",
                      },
                    }}
                  />

                  <TextField
                    required
                    variant="outlined"
                    label="Image URL"
                    name="image"
                    value={question.image}
                    onChange={(e) => handleInputChange(e, index)}
                    fullWidth
                    sx={{
                      width: "100%",
                      marginBottom: "20px",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#F9F6EE",
                        "& fieldset": { borderColor: "black" },
                        "&:hover": { backgroundColor: "#C0C0C0" },
                        "&:hover fieldset:": { borderColor: "black" },
                        "&.Mui-focused fieldset": { borderColor: "black" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "black",
                        backgroundColor: "#3CA3EE",
                        borderRadius: "5px",
                      },
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {question.options.map((option, optionIndex) => (
                      <Box
                        key={optionIndex}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <TextField
                          required
                          variant="outlined"
                          label={`Option ${optionIndex + 1}`}
                          name="value"
                          value={option.value}
                          onChange={(e) =>
                            handleOptionChange(e, index, optionIndex)
                          }
                          sx={{
                            width: "100%",
                            marginBottom: "20px",
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "#F9F6EE",
                              "& fieldset": { borderColor: "black" },
                              "&:hover": { backgroundColor: "#C0C0C0" },
                              "&:hover fieldset:": { borderColor: "black" },
                              "&.Mui-focused fieldset": {
                                borderColor: "black",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "black",
                              backgroundColor: "#3CA3EE",
                              borderRadius: "5px",
                            },
                          }}
                        />

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <Typography variant="subtitle1">Answer?</Typography>
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
                                  color: "#000",
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
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}

          <AppBar
            position="fixed"
            elevation={0}
            sx={{
              top: "auto",
              bottom: 0,
              bgcolor: "transparent",
              height: "100px",
              justifyContent: "center",
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
                    ":hover": { backgroundColor: "#2196F3" },
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
                  }}
                  disabled={!isFormComplete()}
                >
                  Save
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </Box>
    </Box>
  );
};

export default EditImageQuiz;
