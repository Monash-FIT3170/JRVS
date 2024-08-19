import React, { useState } from "react";
//import { Container, Draggable } from "react-smooth-dnd";
import { Button, Typography, Grid, Paper, Tooltip, Box } from '@mui/material';
//import StyledBox from "./StyledBox";

export default function DragAndDrop({ question, index, setSelection, userValues }) {
    // set constants for answers arr, submitted bool and feedback str
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const handleDragStart = (event, option) => {
        event.dataTransfer.setData('option', option);
    };
    
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, newDefinition) => {
        event.preventDefault();
        const term = event.dataTransfer.getData('option');

        // check if a definition is already matched
        const currentDefinition = Object.values(answers).includes(newDefinition);
        if (currentDefinition) { 
            return;
        }

        // Find the previous definition for this term and remove it
        const previousDefinition = answers[term];
        const updatedAnswers = { ...answers };

        // Remove the term from its previous definition
        if (previousDefinition) {
            delete updatedAnswers[term];
        }

        // Assign the term to the new definition
        updatedAnswers[term] = newDefinition;

        setAnswers(updatedAnswers);

        // setAnswers({ ...answers, [term]: definition });
    };

    const handleSubmit = () => {
        setSubmitted(true);
        checkAnswers();
    };

    const resetQuiz = () => {
        setAnswers({});
        setSubmitted(false);
        setFeedbackMessage('');
    };

    const checkAnswers = () => {
        let allCorrect = true;
        question.terms.forEach((term) => {
            if (answers[term.term] !== term.definition) {
                allCorrect = false;
            }
        });
        setFeedbackMessage(allCorrect ? 'Great job! You got all the answers correct!' : 'Oops! Not all answers are correct. Try again!');
    };

    const isIncorrect = (term, definition) => answers[term] !== definition;

    return (
        <div>
            <Grid container direction="column" marginTop='60px'>

                    <Grid item key={question._id}>
                        <Paper elevation={3} border={1} style={{ padding: '30px', backgroundColor: 'white', width: '100%' }}>
                            <Typography variant="h6" align="center">{question.questionText}</Typography>
                            <Grid container spacing={2} justifyContent="center" marginTop='10px'>
                                {question.terms.map((term) => (
                                    <Grid item key={term.term} width='32%' align='center'>
                                        <Tooltip title={submitted && isIncorrect(term.term, answers[term.term]) ? 'Incorrect' : ''}>
                                            <Box
                                                border={1} p={3} mb={1} backgroundColor={'white'} borderColor={'#3CA3EE'} color={'#3CA3EE'} borderRadius={'10px'}
                                                draggable
                                                onDragStart={(event) => handleDragStart(event, term.term)}
                                            >
                                                <Typography variant='outline'> </Typography>{term.term}
                                            </Box>
                                        </Tooltip>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>

                <Grid container spacing={2}>
                        <Grid container spacing={2}>
                            {question.terms.map(({ term, definition }) => (
                                <Grid item key={question} lg={4}>
                                    <Paper elevation={3}
                                        style={{
                                            padding: '20px', textAlign: 'center', backgroundColor: 'white',
                                            height: '250px'
                                        }}
                                        onDragOver={(event) => handleDragOver(event)}
                                        onDrop={(event) => handleDrop(event, definition)} >
                                        <Box border={1} p={3} mb={1} backgroundColor={'white'} borderColor={'#3CA3EE'} color={'#3CA3EE'} borderRadius={'10px'}>
                                            {Object.entries(answers).map(([term, selectedDefinition]) => (
                                                selectedDefinition === definition && <div key={term}>{term}</div>
                                            ))}
                                        </Box>
                                        <Typography>{definition}</Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                </Grid>

                {!submitted && (
                    <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                        <Grid item marginTop='20px'>
                            <Button variant="contained" color="inherit" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                )}
                {submitted && (
                    <Grid container direction="row" justifyContent="flex-end" alignItems="center" marginTop='10px'>
                        <Box padding= '30px' marginRight={10} backgroundColor='white'>{feedbackMessage}</Box>
                        <Button variant="contained" color="inherit" onClick={resetQuiz}>
                            Try Again
                        </Button>
                        <Button variant="contained" color="inherit" onClick={resetQuiz}>
                            Finish
                        </Button>

                    </Grid>
                )}
            </Grid>

        </div>
    );

}      