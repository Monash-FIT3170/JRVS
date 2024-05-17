import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  font: 'Roboto',
  fontSize: 20,
  fontWeight: 700,
  padding: '6px 12px 6px 12px',
  margin: '10px',
  border: '1px solid',
  borderRadius: '20px',
  lineHeight: 1.5,
  backgroundColor: '#155A88',
  borderColor: '#0063cc',
  '&:hover': {
    backgroundColor: '#3CA3EE',
    borderColor: '#3CA3EE',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});


export default function DefaultButton({text, href}) {
  return (
    <CustomButton href={href} variant="contained" disableRipple>
        {text}
    </CustomButton>
  );
}