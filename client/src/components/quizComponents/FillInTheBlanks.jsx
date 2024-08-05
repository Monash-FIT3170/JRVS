import React from 'react';
import TextField from '@mui/material/TextField';
import StyledBox from './StyledBox';

import {
  Typography,
  Box,
  Grid
} from '@mui/material';

export default function FillInTheBlanks({ question, index, setSelection, userValues }) {

  const handleChange = (event) => {
    let newValues = event.target.value;
    setSelection(question.questionText, newValues);
  };

  return (
    <Grid container>
      <Grid item={true} xs={12} display="flex" justifyContent="center">
        <StyledBox>
          <Box sx={{ mx: '35px', mb: '35px' }} >
            <Typography sx={{ display: "inline", color: '#3ca3ee', fontSize: '30px', lineHeight: '60px', fontWeight: 700, mr: '5px' }}>Question {index + 1}</Typography>
            <Typography sx={{ display: "inline", color: '#000000', fontFamily: '"Roboto-Regular", Helvetica', fontSize: '16px', lineHeight: '32px', }}></Typography>{/*Needs fixing to display total question fix another time */}
            <Typography sx={{ display: 'block', color: '#000000', fontFamily: '"Roboto-Regular", Helvetica', fontSize: '16px', my: '20px' }}>{question.questionText}</Typography>
            <TextField

              id="outlined-basic"
              label="Enter the text here"
              placeholder="Enter your answer"
              variant="outlined"
              sx={{ width: '40%' }}
              value={userValues[question.questionText] || ''}
              onChange={handleChange}
            />

          </Box>
        </StyledBox>
      </Grid>
    </Grid>
  );
}
