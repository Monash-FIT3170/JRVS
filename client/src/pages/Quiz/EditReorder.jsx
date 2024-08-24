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

const EditReorderQuestion = () => {
  const navigate = useNavigate();
  const { getData, updateData } = useApi();
  const [questions, setQuestions] = useState([]);
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
  const moveCorrectOption = (questionIndex, optionIndex, direction) => {
    const updatedQuestions = [...questions];
    const options = updatedQuestions[questionIndex].correctOptions;
    const [movedOption] = options.splice(optionIndex, 1);
    options.splice(optionIndex + direction, 0, movedOption);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateData(`api/quizzes/${quizId}`, questions);
      console.log("All questions updated successfully");
      setSuccessMessage("Questions updated successfully!");
      setError("");
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
      wrongoptions: [],
      points: 0,
    };
    console.log("Adding new question:", newQuestion);
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
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
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "1000px",
            marginBottom: "40px",
            marginTop: "50px",
          }}
        >
          <Typography variant="h4" sx={{ color: "#333" }}>
            Edit Reorder Quiz
          </Typography>
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
                marginBottom: "20px",
              }}
            >
              <Box
                sx={{
                  borderRadius: "5px",
                  backgroundColor: "#3CA3EE",
                  width: "50%",
                  padding: "20px",
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
                    <h3 className="heading-font">
                      {questionIndex + 1} | Reorder the steps
                    </h3>
                  </Box>
                  <Box>
                    <IconButton onClick={() => deleteQuestion(questionIndex)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <TextField
                  required
                  variant="outlined"
                  label="Question Text"
                  name="questionText"
                  value={question.questionText}
                  onChange={(e) => handleInputChange(e, questionIndex)}
                  multiline
                  minRows={4}
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
                <h3 className="heading-font">Question Order</h3>
                {question.wrongOptions &&
                  question.wrongOptions.map((option, optionIndex) => (
                    <Box
                      key={optionIndex}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <TextField
                        variant="outlined"
                        label={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionsChange(e, questionIndex, optionIndex)
                        }
                        sx={{
                          flexGrow: 1,
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
                      <IconButton
                        onClick={() =>
                          moveOption(questionIndex, optionIndex, -1)
                        }
                        disabled={optionIndex === 0}
                      >
                        <ArrowUpwardIcon />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          moveOption(questionIndex, optionIndex, 1)
                        }
                        disabled={optionIndex === question.options.length - 1}
                      >
                        <ArrowDownwardIcon />
                      </IconButton>
                    </Box>
                  ))}
                <br></br>
                <h3 className="heading-font">Answer Order</h3>
                {question.correctOptions &&
                  question.correctOptions.map((option, optionIndex) => (
                    <Box
                      key={optionIndex}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <TextField
                        variant="outlined"
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
                          flexGrow: 1,
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
                      <IconButton
                        onClick={() =>
                          moveCorrectOption(questionIndex, optionIndex, -1)
                        }
                        disabled={optionIndex === 0}
                      >
                        <ArrowUpwardIcon />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          moveCorrectOption(questionIndex, optionIndex, 1)
                        }
                        disabled={optionIndex === question.options.length - 1}
                      >
                        <ArrowDownwardIcon />
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
                    marginTop: "20px",
                    backgroundColor: "#FFC93C",
                    ":hover": { backgroundColor: "#2196F3" },
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
            <Button
              onClick={handleBackClick}
              variant="contained"
              className="button-font"
              sx={{
                ":hover": { backgroundColor: "#2196F3" },
                marginLeft: "20px",
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
                marginBottom: "20px",
                backgroundColor: "#FFC93C",
                ":hover": { backgroundColor: "#2196F3" },
                pointerEvents: "auto",
              }}
            >
              Add Question
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              className="button-font"
              sx={{
                ":hover": { backgroundColor: "#2196F3" },
                marginRight: "20px",
                padding: "15px",
                borderRadius: "15px",
                backgroundColor: "#FFC93C",
                pointerEvents: "auto",
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
