import React from 'react'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



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
  </FormControl>
  )
}
