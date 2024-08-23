// src/components/CustomButton.js
import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


const customButtonStyle = {
  backgroundColor: '#155A88', 
  color: '#fff', 
  font: 'Roboto',
  padding: '10px 20px', 
  borderRadius: '20px', 
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
  border: 'none', 
  fontSize: '16px', 
  fontWeight: '600',
  textTransform: 'uppercase',
  transition: 'background-color 0.3s ease', 
  cursor: 'pointer', 
  width: 'calc(100% - 20px)', 
  maxWidth: '200px', 
  textAlign: 'center',
  '&:hover': {
    backgroundColor: '#0056b3', 
  },
};

const CustomButton = ({ onClick, text, style, ...props }) => {
  return (
    <Button
      onClick={onClick}
      style={{ ...customButtonStyle, ...style }}
      {...props}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
