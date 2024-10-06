/**
 * @file quizzes.js
 * @description This component renders a quiz interface where users can navigate through various types of questions including multiple choice, true/false, short answer, reorder, drag and drop, and image quizzes. It fetches quiz data and user information from the API, handles user interactions, and submits the quiz results for scoring and updating user points. The component manages the display of questions, handles form submission, and provides feedback based on user responses.
 *
 * @module quizzes
 * @requires useState, useEffect from React
 * @requires useParams from react-router-dom
 * @requires Box, Grid, Typography from @mui/material
 * @requires MultipleChoice from "../../components/quizComponents/MutipleChoice.jsx"
 * @requires TrueFalse from "../../components/quizComponents/TrueFalse.jsx"
 * @requires ShortAnswer from "../../components/quizComponents/ShortAnswer.jsx"
 * @requires Submitted from "../../components/quizComponents/Submitted.jsx"
 * @requires ActionButton from "../../components/quizComponents/ActionButton.jsx"
 * @requires Reorder from "../../components/quizComponents/Reorder.jsx"
 * @requires DragAndDrop from "../../components/quizComponents/DragAndDrop.jsx"
 * @requires ImageQuiz from "../../components/quizComponents/ImageQuiz.jsx"
 * @requires useApi from "../../context/ApiProvider.jsx"
 * @requires "../../assets/styles/App.css"
 *
 * @example
 * // Example usage:
 * import Quizzes from './Quizzes';
 *
 * function App() {
 *   return <Quizzes />;
 * }
 *
 * @returns {JSX.Element} The rendered quiz interface, including the current quiz question and navigation buttons for interacting with the quiz.
 */

import { Box, Grid, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MultipleChoice from "../../components/quizComponents/MutipleChoice.jsx";
import TrueFalse from "../../components/quizComponents/TrueFalse.jsx";
import ShortAnswer from "../../components/quizComponents/ShortAnswer.jsx";
import Submitted from "../../components/quizComponents/Submitted.jsx";
import MenuBar from "../../components/MenuBar.jsx";
import ActionButton from "../../components/quizComponents/ActionButton.jsx";
import Reorder from "../../components/quizComponents/Reorder.jsx";
import DragAndDrop from "../../components/quizComponents/DragAndDrop.jsx";
import ImageQuiz from "../../components/quizComponents/ImageQuiz.jsx";

import { useApi } from "../../context/ApiProvider.jsx";
import "../../assets/styles/App.css";

function Quizzes() {
  const { getData, postData } = useApi();
  const [quizzes, setQuiz] = useState([]);
  const { quizId } = useParams();
  const [user, setUser] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userValues, setUserValues] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [isQuizLoading, setIsQuizLoading] = useState(true);
  const [finalPoints, setFinalPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getData("api/quizzes/" + quizId);
        setQuiz(responseData);
        setIsQuizLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    // get user
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await postData("api/auth/current", { token });
        const userData = await getData(`api/users/id/${res.decoded.id}`);
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchUser();
  }, [getData, quizId, postData]);

  let questions = quizzes.questions || [];

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const areAllQuestionsAnswered = () => {
    return questions.every(
      (question) => userValues[question.questionText] !== undefined,
    );
  };

  const submitForm = async () => {
    if (!areAllQuestionsAnswered()) {
      alert("Please answer all questions before submitting.");
      return;
    }

    let points = 0;
    let correctCount = 0;

    questions.forEach((question) => {
      if (question.type === "Reorder") {
        let correct = true;
        for (let i = 0; i < question.correctOptions.length; i++) {
          if (
            userValues[question.questionText][i] !== question.correctOptions[i]
          ) {
            correct = false;
            break;
          }
        }
        if (correct) {
          correctCount += 1;
          points += question.points;
        }
      } else if (question.type === "DragAndDrop") {
        let correct = true;
        question.options.forEach((term) => {
          if (
            userValues[question.questionText][term.term] !== term.definition
          ) {
            correct = false;
          }
        });
        if (correct) {
          correctCount += 1;
          points += question.points;
        }
      } else {
        if (
          userValues[question.questionText]?.toString() ===
          question.answer?.toString()
        ) {
          correctCount += 1;
          points += question.points;
        }
      }
    });

    setUserScore(correctCount);
    setTotalScore(questions.length);
    setIsSubmitted(true);
    setFinalPoints(points);

    if (correctCount === questions.length) {
      try {
        const response = await postData("api/users/updatePoints", {
          newPoints: points,
        });
        console.log("Points updated:", response.points);
      } catch (error) {
        console.error("Failed to update points", error);
      }
    }
  };

  const handleNextClick = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleQuizNumberClick = (index) => {
    setCurrentIndex(index);
  };

  const setSelections = (questionText, value) => {
    setUserValues((prevUserValues) => ({
      ...prevUserValues,
      [questionText]: value,
    }));
  };

  const renderQuestion = () => {
    if (isSubmitted) {
      return (
        <Submitted
          score={userScore}
          totalScore={totalScore}
          points={finalPoints}
        />
      );
    } else if (questions.length > 0) {
      const currentQuestion = questions[currentIndex];
      switch (currentQuestion.type) {
        case "MultipleChoice":
          return (
            <MultipleChoice
              question={currentQuestion}
              index={currentIndex}
              setSelection={setSelections}
              userValues={userValues}
            />
          );
        case "TrueFalse":
          return (
            <TrueFalse
              question={currentQuestion}
              index={currentIndex}
              setSelection={setSelections}
              userValues={userValues}
            />
          );
        case "ShortAnswer":
          return (
            <ShortAnswer
              question={currentQuestion}
              index={currentIndex}
              setSelection={setSelections}
              userValues={userValues}
            />
          );
        case "Reorder":
          return (
            <Reorder
              question={currentQuestion}
              index={currentIndex}
              setSelection={setSelections}
              userValues={userValues}
            />
          );
        case "ImageQuiz":
          return (
            <ImageQuiz
              question={currentQuestion}
              index={currentIndex}
              setSelection={setSelections}
              userValues={userValues}
            />
          );
        case "DragAndDrop":
          return (
            <DragAndDrop
              question={currentQuestion}
              index={currentIndex}
              setSelection={setSelections}
              userValues={userValues}
            />
          );
        default:
          return null;
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#3CA3EE",
        overflow: "auto",
      }}
    >
      <Box sx={{ padding: "10px" }}>
        <MenuBar />
      </Box>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ backgroundColor: "#3CA3EE" }}
      >
        {isQuizLoading ? (
          <div className="spinner"></div>
        ) : (
          <Box>
            <Typography
              sx={{
                display: "block",
                color: "white",
                fontSize: "40px",
                lineHeight: "30px",
                fontWeight: 700,
                pl: 6,
              }}
            >
              {quizzes.title || "Quiz"}
            </Typography>
            <Typography
              sx={{
                fontFamily: "sans-serif",
                display: "inline",
                color: "white",
                fontSize: "30px",
                fontWeight: 100,
                pl: 6,
              }}
            >
              {quizzes.heading || ""}
            </Typography>

            {renderQuestion()}

            {!isSubmitted && questions.length > 0 && (
              <Box
                sx={{
                  position: "fixed",
                  left: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                {questions.map((_, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    color={index === currentIndex ? "secondary" : "primary"}
                    sx={{
                      margin: "5px 0",
                      backgroundColor:
                        index === currentIndex ? "#FFD700" : "#B0BEC5",
                      "&:hover": {
                        backgroundColor:
                          index === currentIndex ? "#ffd000" : "#B0BEC5",
                      },
                    }}
                    onClick={() => handleQuizNumberClick(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Grid>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: currentIndex > 0 ? "space-between" : "flex-end",
          paddingBottom: "60px",
          paddingLeft: "60px",
          paddingRight: "60px",
        }}
      >
        {isSubmitted === false && currentIndex > 0 && (
          <ActionButton onClick={handlePrevClick}>Back</ActionButton>
        )}

        {isSubmitted === false &&
        questions.length > 0 &&
        currentIndex === questions.length - 1 ? (
          <ActionButton onClick={submitForm}>Submit</ActionButton>
        ) : (
          isSubmitted === false &&
          questions.length > 0 && (
            <ActionButton onClick={handleNextClick}>Next</ActionButton>
          )
        )}
      </Box>
    </Box>
  );
}

export default Quizzes;
