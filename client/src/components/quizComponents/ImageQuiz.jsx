/**
 * @file TrueFalse.js
 * @description React component for a True/False question with selectable buttons using Material-UI. The component displays the question, an optional image, and provides buttons for user responses. It visually indicates correctness and disables options after selection.
 * @module TrueFalse
 * @requires @mui/material/Typography
 * @requires @mui/material/FormControl
 * @requires @mui/material/Grid
 * @requires @mui/material/Button
 * @requires ./StyledBox
 * @param {Object} props - Component properties.
 * @param {Object} props.question - The question object containing the question text, options, and answer.
 * @param {number} props.index - The index of the current question.
 * @param {Function} props.setSelection - Function to update the user's selected answer.
 * @param {Object} props.userValues - An object containing the user's current answers.
 * @returns {JSX.Element} A Material-UI Grid containing a True/False question with selectable buttons for the options, styled with a custom `StyledBox` component.
 * @example
 * // Example usage of TrueFalse
 * const question = {
 *   questionText: 'Is the Earth round?',
 *   options: [{ value: 'true', option: 'True' }, { value: 'false', option: 'False' }],
 *   answer: 'true',
 *   image: '/path/to/image.jpg'
 * };
 * <TrueFalse question={question} index={1} setSelection={handleSelection} userValues={userAnswers} />
 */

import React from "react";
import { Typography, FormControl, Grid, Button } from "@mui/material";
import { useState, useEffect } from "react";
import StyledBox from "./StyledBox";

export default function TrueFalse({
  question,
  index,
  setSelection,
  userValues,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const checkAnswer = (event) => {
    const selectedValue = event.currentTarget.value;
    setSelectedAnswer(selectedValue);
    setIsCorrect(selectedValue === question.answer);
    setIsDisabled(true);
    setSelection(question.questionText, selectedValue);
  };

  useEffect(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setIsDisabled(false);
  }, [question]);

  const getButtonStyles = (itemValue) => {
    if (selectedAnswer === itemValue) {
      return {
        backgroundColor: isCorrect ? "green" : "red",
        color: "transparent",
      };
    }
  };

  const mappedOptions = question.options.map((item) => (
    <Grid item xs={6} display="flex" justifyContent="center">
      <Button
        variant="outlined"
        value={item.value}
        onClick={checkAnswer}
        disabled={isDisabled}
        sx={{
          width: "400px",
          height: "80px",
          padding: 3,
          px: 5,
          borderRadius: "15px",
          backgroundColor: getButtonStyles(item.value),
          color: "#3CA3EE",
          fontSize: 20,
          "&.Mui-disabled": {
            color: item.value === selectedAnswer ? "white" : "grey",
          },
        }}
      >
        {item.option}
      </Button>
    </Grid>
  ));

  return (
    <Grid container>
      <Grid item xs={12} display="flex" justifyContent="center">
        <StyledBox>
          <FormControl sx={{ mx: "35px", mb: "35px" }}>
            <Typography
              sx={{
                display: "inline",
                color: "#3ca3ee",
                fontSize: "30px",
                lineHeight: "60px",
                fontWeight: 700,
                mr: "5px",
              }}
            >
              Question {index + 1}
            </Typography>
            <Typography
              sx={{
                display: "inline",
                color: "#000000",
                fontFamily: '"Roboto-Regular", Helvetica',
                fontSize: "16px",
                lineHeight: "32px",
              }}
            ></Typography>
            {/*Needs fixing to display total question fix another time */}
            <Typography
              sx={{
                display: "block",
                color: "#000000",
                fontFamily: '"Roboto-Regular", Helvetica',
                fontSize: "20px",
                fontWeight: 400,
                my: "20px",
              }}
            >
              {question.questionText}
            </Typography>

            <Grid container sx={{ pt: "15px" }}>
              <Grid
                xs={12}
                display="flex"
                justifyContent="center"
                sx={{ mb: "20px" }}
              >
                <img
                  srcSet={`${question.image}`}
                  src={`${question.image}`}
                  alt="Demo"
                  loading="lazy"
                  width="600"
                  height="350"
                />
              </Grid>
              {mappedOptions}
            </Grid>
          </FormControl>
        </StyledBox>
      </Grid>
    </Grid>
  );
}
