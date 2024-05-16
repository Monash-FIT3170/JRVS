import React, { useState } from "react";
import { Button, Container, Typography, Card, CardMedia, Grid } from "@mui/material";
import Robot from "../../assets/images/Robot.png";


export default function ImageQuiz(data) {
    const [selectedOption, setSelectedOption] = useState("");
    const [score, setScore] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleOptionSelect = (selectedAnswer) => {
        setSelectedOption(selectedAnswer);
    };

    const handleOptionCheck = () => {
        const currentQuestion = questions[currentImageIndex];
        if (selectedOption === currentQuestion.correctAnswer) {
            setScore(score + 1);
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setShowResult(true);
        checkAnswers();
    };

    const handleNextQuestion = () => {
        setSelectedOption("");
        setShowResult(false);
        setIsCorrect(false);
        if (currentImageIndex < questions.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handleFinishQuiz = () => {
        setCurrentImageIndex(null);
    };

    const handleGoBack = () => {
        console.log("Navigating back to the learning path page...");
    };

    const handleTryAgain = () => {
        setCurrentImageIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption("");
        setIsCorrect(false);
        setFeedbackMessage("");
    };

    const questions = data?.data?.item?.questions || [];

    const checkAnswers = () => {
        const currentQuestion = questions[currentImageIndex];
        const isCorrect = selectedOption === currentQuestion.answer;
        if (isCorrect) {
            setScore(score + 1);
            setFeedbackMessage("Correct!");
        } else {
            setFeedbackMessage("Incorrect!");
        }
    };

    return (
        <div style={{ backgroundColor: '#3CA3EE', minHeight: '80vh' }}>
            <Container>
                <Typography variant="h4" style={{ color: 'white', marginBottom: '20px' }}>QUIZ</Typography>
                {currentImageIndex !== null && (
                    <Typography variant="h3" style={{ color: 'white', marginBottom: '20px' }}>
                        {questions[currentImageIndex].question}
                    </Typography>
                )}
            </Container>



            <Container
                style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '20px',
                    marginTop: '30px',
                    marginBottom: '30px',
                    position: 'relative',
                }}
            >
                {currentImageIndex !== null && (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: '20px',
            left: '20px',
        }}
    >
        <Typography variant="h3" color='primary'>{currentImageIndex + 1} </Typography> 
        <Typography variant="h5">/{questions.length}</Typography> 
    </div>
)}



                {currentImageIndex !== null ? (
                    <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
                        <Grid item>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    style={{ width: "80vw", maxWidth: "600px" }}
                                    image={questions[currentImageIndex].image}
                                    alt={`Question ${currentImageIndex + 1}`}
                                />
                            </Card>
                        </Grid>
                        <Grid item container spacing={2} justifyContent="center" direction="column">
                            {questions[currentImageIndex].options.map((option) => (
                                <Grid item key={option}>
                                    <Button
                                        fullWidth
                                        variant={selectedOption === option ? "contained" : "outlined"}
                                        onClick={() => handleOptionSelect(option)}
                                        disabled={showResult}
                                    >
                                        {option}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={12} style={{ width: "100%", marginTop: "20px" }}>
                            {!showResult && (
                                <Button onClick={handleOptionCheck} disabled={!selectedOption} fullWidth>
                                    Check
                                </Button>
                            )}
                            {showResult && (
                                <>
                                    <Button onClick={currentImageIndex === questions.length - 1 ? handleFinishQuiz : handleNextQuestion} fullWidth variant="contained" color="primary">
                                        {currentImageIndex === questions.length - 1 ? "Finish" : "Next"}
                                    </Button>
                                </>
                            )}
                            {showResult && (
                                <Typography variant="h6" align="center" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                    {feedbackMessage}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
                        <Grid item>
                            <img src={Robot} alt="Robot" style={{ height: "150px" }} />
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" align="center">
                                Congratulations, you've completed the quiz!

                            </Typography>
                            <Typography variant="h5" align="center" marginTop='20px'>
                                You got {score} out of {questions.length}.
                            </Typography>
                        </Grid>
                        <Grid item container direction="column" alignItems="center">
                            <Grid item>
                                <Button onClick={handleTryAgain} variant="contained" color="primary" style={{ marginBottom: '10px', width: '300px' }}>
                                    Redo Quiz
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={handleGoBack} variant="contained" color="primary" style={{ marginBottom: '10px', width: '300px' }}>
                                    Return to Learning Path
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                )}
            </Container>
        </div>

    );
}
