
import React from 'react';
import { Button } from '@mui/material';

const ActionButton = ({ onClick, children }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        ':hover': { backgroundColor: '#E6B635' },
        padding: 3,
        px:5,
        borderRadius: '15px',
        backgroundColor: '#FFD700',
        fontSize:15
      }}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
