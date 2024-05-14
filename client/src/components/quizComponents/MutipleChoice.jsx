import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
  Grid
} from '@mui/material';
import StyledBox from './StyledBox';
import { useState } from 'react';




export default function MultipleChoice({ question, index, setSelection, userValues }) {


  const handleRadioChange = (event) => {
    let newValues = event.target.value;
    setSelection(question.question, newValues);

  };


  const mappedOptions = question.options.map((item) => (

    <FormControlLabel sx={{
      border: 1,
      borderColor: '#ccc',
      borderRadius: '8px',
      padding: '8px',
      margin: '8px',
      display: 'flex',
      alignItems: 'center',
      fontFamily: '"Roboto-Regular", Helvetica'

    }} value={item.value} key={item.option} control={<Radio />} label={item.option} />
  ));




  return (
    <Grid container>
      <Grid item={true} xs={12} display="flex" justifyContent="center">
        <StyledBox  >

          <Box sx={{ mx: '35px', mb: '35px' }} >
            <Typography sx={{ display: "inline", color: '#3ca3ee', fontSize: '30px', lineHeight: '60px', fontWeight: 700, mr: '5px' }}>Question {index + 1}</Typography>
            <Typography sx={{ display: "inline", color: '#000000', fontFamily: '"Roboto-Regular", Helvetica', fontSize: '16px', lineHeight: '32px', }}></Typography>{/*Needs fixing to display total question fix another time */}
            <Typography sx={{ display: 'block', color: '#000000', fontFamily: '"Roboto-Regular", Helvetica', fontSize: '16px', my: '20px' }}>{question.question}</Typography>


            <RadioGroup value={userValues[question.question] || ''} onChange={handleRadioChange} >
              {mappedOptions}
            </RadioGroup>
          </Box>


        </StyledBox>

      </Grid>
    </Grid>
  )
}
