/**
 * @file Reorder.js
 * @description React component for a reorderable list question using react-smooth-dnd for drag-and-drop functionality. It allows users to reorder a list of options and updates the selection accordingly.
 * @module Reorder
 * @requires react
 * @requires react-smooth-dnd
 * @requires @mui/material/ListItem
 * @requires @mui/material/ListItemText
 * @requires @mui/material/Grid
 * @requires @mui/material/Typography
 * @requires ./StyledBox
 * @requires ../../components/content/botBox
 * @param {Object} props - Component properties.
 * @param {Object} props.question - The question object containing the question text and options.
 * @param {number} props.index - The index of the current question.
 * @param {Function} props.setSelection - Function to update the user's reordered list.
 * @param {Object} props.userValues - An object containing the user's current answers or selected options.
 * @returns {JSX.Element} A Material-UI Grid with draggable list items for reordering, styled with a custom `StyledBox` component.
 * @example
 * // Example usage of Reorder
 * const question = { questionText: 'Order these items:', wrongOptions: ['A', 'B', 'C'] };
 * <Reorder question={question} index={0} setSelection={handleSelection} userValues={userAnswers} />
 */

import React, { useEffect } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { ListItem, ListItemText, Grid, Typography } from "@mui/material";
import StyledBox from "./StyledBox";

//uses react-smooth-dnd
export default function Reorder({ question, index, setSelection, userValues }) {
  let order = userValues[question.questionText] || question.wrongOptions;

  useEffect(() => {
    setSelection(question.questionText, order);
  }, [question]);

  //We can set the selection first before we do anything just in case
  const onDrop = ({ removedIndex, addedIndex }) => {
    //We remove the item with splice, then add the item back to the new index
    const [removedOption] = order.splice(removedIndex, 1);
    order.splice(addedIndex, 0, removedOption);
    setSelection(question.questionText, order);
  };

  const mappedIndex = order.map((item, idx) => (
    <Draggable key={idx}>
      <ListItem
        sx={{
          my: "8px",
          ml: "10px",
          display: "flex",
          alignItems: "center",
          fontFamily: '"Roboto-Regular", Helvetica',
        }}
      >
        <ListItemText
          primary={idx + 1}
          primaryTypographyProps={{ fontSize: "18px", fontWeight: 500 }}
        />
      </ListItem>
    </Draggable>
  ));

  const mappedOptions = order.map((item) => (
    <Draggable key={item}>
      <ListItem
        sx={{
          border: 1,
          borderColor: "#ccc",
          borderRadius: "8px",
          padding: "8px",
          margin: "8px",
          display: "flex",
          alignItems: "center",
          fontFamily: '"Roboto-Regular", Helvetica',
          width: "50%",
        }}
      >
        <ListItemText primary={item} sx={{ fontSize: 700 }} />
      </ListItem>
    </Draggable>
  ));
  return (
    <Grid container>
      <Grid item xs={12} display="flex" justifyContent="center">
        <StyledBox>
          <Grid xs={12}>
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

            <Grid container>
              <Grid xs={1}>
                <Container lockAxis="x,y">{mappedIndex}</Container>
              </Grid>

              <Grid xs={11}>
                <Container lockAxis="y" onDrop={onDrop}>
                  {mappedOptions}
                </Container>
              </Grid>
            </Grid>
          </Grid>
        </StyledBox>
      </Grid>
    </Grid>
  );
}
