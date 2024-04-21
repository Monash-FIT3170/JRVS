import React from 'react'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';




export default function MultipleChoiceQ(data) {
  
  const mappedOptions = data.data.item.options.map((item) => (
    <FormControlLabel value={item.option} key = {item.option} control={<Radio />} label={item.option} />
  ));



  return (
    <FormControl >
     
    <FormLabel id="mcq-label" sx={{color: 'white'}}>{data.data.index+1}: {data.data.item.question}</FormLabel>
    <RadioGroup
    > 
    {mappedOptions}
      
    </RadioGroup>
    <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Check Answer
        </Button>
        <br></br>
  </FormControl>
  )
}
