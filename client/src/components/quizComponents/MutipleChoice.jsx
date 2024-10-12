/**
 * @file MultipleChoice.js
 * @description React component for a multiple-choice question using Material-UI Radio buttons. It allows users to select one option from a list of choices and updates the selection accordingly.
 * @module MultipleChoice
 * @requires @mui/material/Radio
 * @requires @mui/material/RadioGroup
 * @requires @mui/material/FormControlLabel
 * @requires @mui/material/Typography
 * @requires @mui/material/Grid
 * @requires @mui/material/FormControl
 * @requires ./StyledBox
 * @param {Object} props - Component properties.
 * @param {Object} props.question - The question object containing the question text and options.
 * @param {number} props.index - The index of the current question.
 * @param {Function} props.setSelection - Function to update the user's selected option.
 * @param {Object} props.userValues - An object containing the user's current answers or selected options.
 * @returns {JSX.Element} A Material-UI Grid containing a multiple-choice question with radio buttons for selection, styled with a custom `StyledBox` component.
 * @example
 * // Example usage of MultipleChoice
 * const question = { questionText: 'What is your favorite color?', options: [{ value: 'red', option: 'Red' }, { value: 'blue', option: 'Blue' }] };
 * <MultipleChoice question={question} index={1} setSelection={handleSelection} userValues={userAnswers} />
 */

import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Grid,
  FormControl,
} from "@mui/material";
import StyledBox from "./StyledBox";

export default function MultipleChoice({
  question,
  index,
  setSelection,
  userValues,
}) {
  const handleRadioChange = (event) => {
    let newValues = event.target.value;

    setSelection(question.questionText, newValues);
  };

  const mappedOptions = question.options.map((item) => (
    <FormControlLabel
      sx={{
        border: 1,
        borderColor: "#ccc",
        borderRadius: "8px",
        padding: "8px",
        margin: "8px",
        display: "flex",
        alignItems: "center",
        fontFamily: '"Roboto-Regular", Helvetica',
      }}
      value={item.value}
      key={item.option}
      control={<Radio />}
      label={item.option}
    />
  ));

  return (
    <Grid container>
      <Grid item={true} xs={12} display="flex" justifyContent="center">
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
                fontSize: "16px",
                my: "20px",
              }}
            >
              {question.questionText}
            </Typography>

            <RadioGroup
              value={userValues[question.questionText] || ""}
              onChange={handleRadioChange}
            >
              {mappedOptions}
            </RadioGroup>
          </FormControl>
        </StyledBox>
      </Grid>
    </Grid>
  );
}
