import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  IconButton,
} from "@mui/material";
import MenuBar from "../../components/MenuBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../../context/ApiProvider";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const EditDragDrop = () => {
  const navigate = useNavigate();
  const { getData, updateData } = useApi();
  const [questions, setQuestions] = useState([]); // Modified: Updated to handle DragAndDrop questions
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { quizId } = useParams(); // Modified: To get quizId from the URL
  const [successMessage, setSuccessMessage] = useState("");

  const handleBackClick = () => {
    navigate(-1);
  };

  // Modified: Fetch quiz data and pre-fill form with existing questions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const quiz = await getData(`api/quizzes/${quizId}`);
        if (quiz.questions) {
          const dragAndDropQuestions = quiz.questions.filter(
            (q) => q.type === "DragAndDrop",
          );
          setQuestions(dragAndDropQuestions);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch quiz data.");
      }
    };
    fetchData();
  }, [getData, quizId]);

  // Modified: Handle input changes for both question text and term-definition pairs
  const handleInputChange = (e, qIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleTermChange = (e, qIndex, tIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].terms[tIndex][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedQuiz = { questions }; // Modified: Ensure the entire quiz object is updated
      await updateData(`api/quizzes/${quizId}`, updatedQuiz);
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
      terms: [{ term: "", definition: "", _id: new Date().getTime() }],
      type: "DragAndDrop", // Modified: Set type to DragAndDrop
    };
    setQuestions([...questions, newQuestion]);
  };

  const addTermDefinitionPair = (qIndex) => {
    const newPair = { term: "", definition: "", _id: new Date().getTime() };
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].terms.push(newPair);
    setQuestions(updatedQuestions);
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

  const deleteTermDefinitionPair = (qIndex, tIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].terms = updatedQuestions[qIndex].terms.filter(
      (_, i) => i !== tIndex,
    );
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
        {!isLoading &&
          questions.map((question, qIndex) => (
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
                marginTop: "20px",
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
                      {qIndex + 1} | Drag and Drop
                    </h3>
                  </Box>
                  <Box>
                    <IconButton
                      onClick={() => moveQuestion(qIndex, -1)}
                      disabled={qIndex === 0}
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => moveQuestion(qIndex, 1)}
                      disabled={qIndex === questions.length - 1}
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteQuestion(qIndex)}>
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
                  onChange={(e) => handleInputChange(e, qIndex)} // Modified: Handle question text change
                  multiline
                  minRows={4}
                  sx={{
                    width: "100%",
                    marginBottom: "20px",
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F9F6EE",
                      "& fieldset": { borderColor: "black" },
                      "&:hover": { backgroundColor: "#C0C0C0" },
                      "&:hover fieldset": { borderColor: "black" },
                      "&.Mui-focused fieldset": { borderColor: "black" },
                    },
                    "& .MuiInputLabel-root": {
                      color: "black",
                      backgroundColor: "#3CA3EE",
                      borderRadius: "5px",
                    },
                  }}
                />
                {question.terms.map((termObj, tIndex) => (
                  <Box
                    key={termObj._id}
                    sx={{ display: "flex", marginBottom: "10px" }}
                  >
                    <TextField
                      required
                      variant="outlined"
                      label="Term"
                      name="term"
                      value={termObj.term}
                      onChange={(e) => handleTermChange(e, qIndex, tIndex)} // Modified: Handle term change
                      sx={{
                        width: "45%",
                        marginRight: "10%",
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#F9F6EE",
                          "& fieldset": { borderColor: "black" },
                          "&:hover": { backgroundColor: "#C0C0C0" },
                          "&:hover fieldset": { borderColor: "black" },
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
                      label="Definition"
                      name="definition"
                      value={termObj.definition}
                      onChange={(e) => handleTermChange(e, qIndex, tIndex)} // Modified: Handle definition change
                      sx={{
                        width: "45%",
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#F9F6EE",
                          "& fieldset": { borderColor: "black" },
                          "&:hover": { backgroundColor: "#C0C0C0" },
                          "&:hover fieldset": { borderColor: "black" },
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
                      onClick={() => deleteTermDefinitionPair(qIndex, tIndex)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  onClick={() => addTermDefinitionPair(qIndex)} // Modified: Add new term-definition pair
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: "#FFC93C",
                    ":hover": { backgroundColor: "#2196F3" },
                    marginTop: "10px",
                  }}
                >
                  Add Term-Definition Pair
                </Button>
              </Box>
            </Box>
          ))}

        <Button
          onClick={addNewQuestion}
          variant="contained"
          sx={{
            marginTop: "20px",
            backgroundColor: "#FFC93C",
            ":hover": { backgroundColor: "#2196F3" },
          }}
        >
          Add New Question
        </Button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "#FFC93C",
            ":hover": { backgroundColor: "#2196F3" },
          }}
        >
          Save Quiz
        </Button>
      </Box>
    </Box>
  );
};

export default EditDragDrop;
