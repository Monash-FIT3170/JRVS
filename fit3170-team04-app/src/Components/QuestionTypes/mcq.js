
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { FormHelperText } from '@mui/material';




export default function MultipleChoiceQ(data) {
  
  // This allows us to store a value, and a setValue to set the value to smth else.
  //By default we have left the default value to empty
  const [value, setValue] = useState('');
  const [helperText, setHelperText] = useState('');
  const [correct, setCorrect] = useState('white')
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText('')
    setCorrect('red')

   
  };

  const handleSubmit = (event) => {
    if (value === data.data.item.answer){
      
      setHelperText('Correct!');
      
    }
    else {
      setHelperText('Incorrect...');
  
    }
  }
  const mappedOptions = data.data.item.options.map((item) => (
    <FormControlLabel value={item.option} key = {item.option} control={<Radio />} label={item.option} />
  ));



  return (
    <FormControl>
    <FormLabel id="mcq-label" sx={{color: 'black'}}>{data.data.index+1}: {data.data.item.question}</FormLabel>
    <RadioGroup onChange = {handleRadioChange}> 
    {mappedOptions}
    </RadioGroup>


    <FormHelperText sx={{color: {correct}}}>{helperText}</FormHelperText>
    <Button sx={{ mt: 1, mr: 1 }} onClick={handleSubmit} variant="outlined">
          Check Answer
        </Button>
        <br></br>
  </FormControl>
  )
}
