/**
 * @file Submitted.js
 * @description React component that displays a submission result page after a quiz or activity is completed. It shows the score, total score, and rewards points, and triggers a confetti animation for successful attempts.
 * @module Submitted
 * @requires @mui/material/Button
 * @requires @mui/material/Typography
 * @requires @mui/material/Box
 * @requires @mui/material/Grid
 * @requires react
 * @requires react-confetti
 * @requires ../../components/content/botBox
 * @requires react-router-dom
 * @param {Object} props - Component properties.
 * @param {number} props.score - The user's score in the quiz or activity.
 * @param {number} props.totalScore - The total possible score for the quiz or activity.
 * @param {number} props.points - The points awarded to the user for their performance.
 * @returns {JSX.Element} A Material-UI Grid displaying the results, score, and a button to return to the learning path.
 * @example
 * // Example usage of Submitted
 * <Submitted score={8} totalScore={10} points={50} />
 */

import { Button, Typography, Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import BotBox from "../../components/content/botBox";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../../context/ApiProvider.jsx";

export default function Submitted({ score, totalScore, points }) {
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();
  const { unitId, quizId } = useParams();
  const { getData, postData, updateData } = useApi();

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleFinishQuiz = async () => {
    try {
      await updateData(`api/userUnitProgress/${unitId}`, {
        newCompletedLessons: [quizId],
      });
      navigate(-1);
    } catch (error) {
      console.log(error.message);
    }

    try {
      console.log("userUnitProgress entry not found, creating a new one...");
      await postData(`api/userUnitProgress/${unitId}`, {
        completedLessons: [quizId],
      });
      navigate(-1);
    } catch (creationError) {
      console.error("Error creating user progress entry:", creationError);
    }
  };

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12} display="flex" justifyContent="center">
        {showConfetti && <Confetti />}
        <Box
          sx={{
            border: 0,
            boxShadow: 2,
            borderRadius: "40px",
            bgcolor: "white",
            borderColor: "black",
            color: "black",
            minHeight: "200px",
            minWidth: "512px",
            maxWidth: "512px",
            alignItems: "center",
            pt: 2,
            pb: 4,
            mt: 5,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <BotBox></BotBox>
          <Typography
            sx={{
              display: "inline",
              color: "#000000",
              fontSize: "30px",
              fontWeight: 600,
              fontFamily: '"Roboto-Regular", Helvetica',
              mb: "20px",
              mt: "12px",
            }}
          >
            {points > 0 ? "Congratulations!" : "Try Again!"}
          </Typography>

          <Typography
            sx={{
              display: "block",
              color: "#000000",
              fontSize: "20px",
              fontWeight: 100,
              fontFamily: '"Roboto-Regular", Helvetica',
              lineHeight: "32px",
            }}
          >
            Your Score{" "}
          </Typography>
          <Typography
            sx={{
              display: "block",
              color: "#000000",
              fontSize: "40px",
              fontWeight: 700,
              fontFamily: '"Roboto-Bold", Helvetica',
              lineHeight: "32px",
              pb: 3,
            }}
          >
            {score}/{totalScore}
          </Typography>

          <div
            style={{
              padding: "10px",
              backgroundColor: "#FFC700",
              borderRadius: "20px",
              color: "white",
            }}
          >
            <p className="russo-one-regular text-4xl">
              &nbsp; +{points} ⭐️&nbsp;
            </p>
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Button
          onClick={handleFinishQuiz}
          variant="contained"
          className="button-font"
          sx={{
            ":hover": { backgroundColor: "#E6B635" },
            padding: "14px",
            mt: "20px",
            mb: "20px",
            borderRadius: "15px",
            backgroundColor: "#FFC93C",
            fontSize: "20px",
            fontWeight: 700,
            fontFamily: '"Roboto-Bold", Helvetica',
            pointerEvents: "auto",
            zIndex: 100,
          }}
        >
          Return to learning path
        </Button>
      </Grid>
    </Grid>
  );
}
