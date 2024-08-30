/**
 * @file TrueFalse.js
 * @description React component for rendering a true/false question with radio buttons using Material-UI components. It displays a question, allows users to select their answer, and handles changes to update the selection state.
 * @module TrueFalse
 * @requires @mui/material/Radio
 * @requires @mui/material/RadioGroup
 * @requires @mui/material/FormControlLabel
 * @requires @mui/material/Typography
 * @requires @mui/material/FormControl
 * @requires @mui/material/Grid
 * @requires ./StyledBox
 * @param {Object} props - Component properties.
 * @param {Object} props.question - The question object containing the question text and options.
 * @param {number} props.index - The index of the current question.
 * @param {Function} props.setSelection - Function to update the selected answer for the question.
 * @param {Object} props.userValues - An object containing the user's selected values for the questions.
 * @returns {JSX.Element} A Material-UI Grid containing the question and radio button options for true/false answers.
 * @example
 * // Example usage of TrueFalse
 * const question = { questionText: 'Is the sky blue?', options: [{option: 'True', value: 'true'}, {option: 'False', value: 'false'}] };
 * <TrueFalse question={question} index={0} setSelection={handleSelection} userValues={userAnswers} />
 */


import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  FormControl,
  Grid
} from '@mui/material';
import StyledBox from './StyledBox';



export default function TrueFalse({ question, index, setSelection, userValues }) {


  const handleRadioChange = (event) => {
    const newValue = event.target.value === 'true';

    setSelection(question.questionText, newValue);
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
      <Grid item xs={12} display="flex" justifyContent="center">
        <StyledBox >

          <FormControl sx={{ mx: '35px', mb: '35px' }} >
            <Typography sx={{ display: "inline", color: '#3ca3ee', fontSize: '30px', lineHeight: '60px', fontWeight: 700, mr: '5px' }}>Question {index + 1}</Typography>
            <Typography sx={{ display: "inline", color: '#000000', fontFamily: '"Roboto-Regular", Helvetica', fontSize: '16px', lineHeight: '32px', }}></Typography>{/*Needs fixing to display total question fix another time */}
            <Typography sx={{ display: 'block', color: '#000000', fontFamily: '"Roboto-Regular", Helvetica', fontSize: '16px', my: '20px' }}>{question.questionText}</Typography>
            <RadioGroup value={String(userValues[question.questionText]) || ''} onChange={handleRadioChange} >
              {mappedOptions}
            </RadioGroup>
          </FormControl>


        </StyledBox>

      </Grid>
    </Grid>
  )
}
