import React from 'react'

import TextField from '@mui/material/TextField';
import { FormLabel } from '@mui/material';
import {FormControl} from '@mui/material';
import {Button} from '@mui/material';
import { useState } from 'react';
import { FormHelperText } from '@mui/material';


export default function ShortAnswer(data) {
  const [value, setValue] = useState('');

  const [helperText, setHelperText] = useState('');
  const handleSubmit = (event) => {
    
    setValue(event.target.value)
    setHelperText('Submitted')

    }
  


  return (
    <FormControl >
        <FormLabel id="mcq-label" sx={{color: 'black'}}>{data.data.index+1}: {data.data.item.question}</FormLabel>
        <TextField
            sx={{color: 'white'}}
          id="outlined-textarea"
          label="Enter the text here"
          placeholder=""
          variant="filled"
          multiline
          
        />

<FormHelperText>{helperText}</FormHelperText>
<Button sx={{ mt: 1, mr: 1 }} onClick = {handleSubmit} variant="outlined">
          Submit
        </Button>
        <br></br>
    </FormControl>
  )
}
