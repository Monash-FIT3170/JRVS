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
} from "@mui/material";
import MenuBar from "../../components/MenuBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../../context/ApiProvider";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const EditTrueFalse = () => {
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

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateData(`api/quizzes/${quizId}`, questions);
      console.log(questions);
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
      answer: "",
      type: "TrueFalse", // Set the default type
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#3CA3EE",
      }}
    >
      <Box sx={{ padding: "10px" }}>
        <MenuBar />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          paddingBottom: "100px",
          bgcolor: "white",
          overflowY: "auto",
          paddingTop: "20px",
        }}
      >
        {!isLoading &&
          questions.map((question, index) => (
            <Box
              key={question._id}
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
                  borderWidth: "2px",
                  borderColor: "black",
                  width: "50%",
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
                  <h3 className="heading-font">{index + 1} | True or False </h3>
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
                  sx={{ width: "100%", marginBottom: "20px" }}
                />
                <FormControl required variant="outlined" sx={{ width: "100%" }}>
                  <InputLabel>Answer</InputLabel>
                  <Select
                    label="Answer"
                    name="answer"
                    value={question.answer}
                    onChange={(e) => handleInputChange(e, index)}
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

export default EditTrueFalse;
