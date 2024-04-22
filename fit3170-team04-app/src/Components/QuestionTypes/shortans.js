import React from 'react'

import TextField from '@mui/material/TextField';
import { FormLabel } from '@mui/material';
import {FormControl} from '@mui/material';
import {Button} from '@mui/material';
export default function ShortAnswer(data) {
  return (
    <FormControl >
        <FormLabel id="mcq-label" sx={{color: 'white'}}>{data.data.index+1}: {data.data.item.question}</FormLabel>
        <TextField
            sx={{color: 'white'}}
          id="outlined-textarea"
          label="Enter the text here"
          placeholder=""
          variant="filled"

          multiline
          
        />

<Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Submit
        </Button>
        <br></br>
    </FormControl>
  )
}
