/**
 * @file DragAndDrop.js
 * @description React component for a drag-and-drop matching exercise where users drag terms to match with their definitions. It utilizes Material-UI components and supports drag-and-drop functionality with visual feedback.
 * @module DragAndDrop
 * @requires @mui/material/Typography
 * @requires @mui/material/Grid
 * @requires @mui/material/Paper
 * @requires @mui/material/Tooltip
 * @requires @mui/material/Box
 * @param {Object} props - Component properties.
 * @param {Object} props.question - The question object containing the question text and options (terms and definitions) for the drag-and-drop exercise.
 * @param {number} props.index - The index of the current question.
 * @param {Function} props.setSelection - Function to update the user's selections.
 * @param {Object} props.userValues - An object containing the user's current answers.
 * @returns {JSX.Element} A Material-UI Grid containing a drag-and-drop matching exercise with terms and definitions, styled with Paper and Box components.
 * @example
 * // Example usage of DragAndDrop
 * const question = {
 *   questionText: 'Match the terms with their definitions:',
 *   options: [
 *     { term: 'Term1', definition: 'Definition1' },
 *     { term: 'Term2', definition: 'Definition2' },
 *     // more terms and definitions
 *   ],
 * };
 * <DragAndDrop question={question} index={1} setSelection={handleSelection} userValues={userAnswers} />
 */

import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper, Tooltip, Box } from "@mui/material";

export default function DragAndDrop({ question, setSelection }) {
  const [answers, setAnswers] = useState({});
  //const [submitted, setSubmitted] = useState(false);
  //const [feedbackMessage, setFeedbackMessage] = useState('');
  const [shuffledTerms, setShuffledTerms] = useState([]);
  //const isIncorrect = (term, definition) => answers[term] !== definition;
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // set selection at start just in case
    setSelection(question.questionText, answers);
    // debugging only
    for (let i = 0; i < question.options.length; i++) {
      console.log("the ith option's term is: ", question.options[i].term);
    }
    console.log("original questions", question.options);
    if (question?.options) {
      // check question.options is populated
      const shuffled = shuffleArray(question.options);
      setShuffledTerms(shuffled);
      //setSelection(question.questionText,sh
      console.log("shuffled terms", shuffled);
    }
  }, [question]);

  // Fisher-Yates shuffle algorithm, source: https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleDragStart = (event, option) => {
    event.dataTransfer.setData("option", option);
    setIsDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, newDefinition) => {
    event.preventDefault();
    setIsDragging(false);
    const term = event.dataTransfer.getData("option");
    const currentTermInNewDefinition = Object.entries(answers).find(
      // eslint-disable-next-line no-unused-vars
      ([key, value]) => value === newDefinition,
    );
    const previousDefinition = answers[term];
    const updatedAnswers = { ...answers };

    if (currentTermInNewDefinition) {
      const [currentTerm] = currentTermInNewDefinition;
      updatedAnswers[currentTerm] = previousDefinition;
    }

    updatedAnswers[term] = newDefinition;
    setAnswers(updatedAnswers);
    setSelection(question.questionText, updatedAnswers);
  };

  return (
    <div>
      <Grid container direction="column" marginTop="60px">
        <Grid item key={question._id}>
          <Paper
            elevation={3}
            border={1}
            style={{ padding: "30px", backgroundColor: "white", width: "100%" }}
          >
            <Typography variant="h6" align="center">
              {question.questionText}
            </Typography>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              marginTop="10px"
            >
              {shuffledTerms.map((term) => (
                <Grid item key={term.term} width="32%" align="center">
                  <Tooltip title={term.term}>
                    <Box
                      border={1}
                      p={3}
                      mb={1}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        transition: "background-color 0.5s ease",
                        "&:hover": {
                          backgroundColor: "#C0C0C0",
                          cursor: "grab",
                        },
                        cursor: isDragging ? "grabbing" : "grab",
                      }}
                      backgroundColor={"white"}
                      borderColor={"#3CA3EE"}
                      color={"#3CA3EE"}
                      borderRadius={"10px"}
                      draggable
                      onDragStart={(event) => handleDragStart(event, term.term)}
                      onDragEnd={() => setIsDragging(false)}
                    >
                      <Typography variant="outline"> </Typography>
                      {term.term}
                    </Box>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid container spacing={2} marginTop="10px">
          <Grid container spacing={2}>
            {question.options.map(({ term, definition }) => (
              <Grid item key={term}>
                <Paper
                  elevation={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                    textAlign: "center",
                    backgroundColor: "white",
                    height: "250px",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  onDragOver={(event) => handleDragOver(event)}
                  onDrop={(event) => handleDrop(event, definition)}
                >
                  <Box
                    border={1}
                    p={3}
                    mb={1}
                    sx={{ display: "flex", justifyContent: "center" }}
                    backgroundColor={isDragging ? "#C0C0C0" : "white"}
                    borderColor={"#3CA3EE"}
                    color={"#3CA3EE"}
                    borderRadius={"10px"}
                  >
                    {Object.entries(answers).map(
                      ([term, selectedDefinition]) =>
                        selectedDefinition === definition && (
                          <div key={term}>{term}</div>
                        ),
                    )}
                  </Box>
                  <Typography>{definition}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
