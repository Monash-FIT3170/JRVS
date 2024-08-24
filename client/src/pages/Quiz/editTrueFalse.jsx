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

  const isFormComplete = () => {
    return questions.every(
      (question) =>
        question && question.questionText && question.questionText.trim() !== "" && question.answer && question.answer !== "",
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
            padding: "60px",
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
            sx={{ paddingBottom: "25px", color: "#333" }}
          >
            Edit True/False Questions
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
                      {index + 1} | True or False{" "}
                    </h3>
                    <Box>
                      <IconButton
                        onClick={() => moveQuestion(index, -1)}
                        disabled={index === 0}
                      >
                        <ArrowUpwardIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => moveQuestion(index, 1)}
                        disabled={index === questions.length - 1}
                      >
                        <ArrowDownwardIcon />
                      </IconButton>
                      <IconButton onClick={() => deleteQuestion(index)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => revertQuestion(index)}>
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
                  <FormControl
                    required
                    variant="outlined"
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
                        backgroundColor: "#F9F6EE",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                        "&:hover": {
                          backgroundColor: "#C0C0C0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                      }}
                    >
                      <MenuItem value="true">True</MenuItem>
                      <MenuItem value="false">False</MenuItem>
                    </Select>
                  </FormControl>

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
  );
};

export default EditTrueFalse;
