
import React from 'react';
import { Button } from '@mui/material';

const ActionButton = ({ onClick, children }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        ':hover': { backgroundColor: '#E6B635' },
        padding: '15px',
        borderRadius: '15px',
        backgroundColor: '#FFC93C'
      }}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
