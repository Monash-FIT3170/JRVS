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
