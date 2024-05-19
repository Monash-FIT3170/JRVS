import React from 'react';
import { Box } from '@mui/material';

const StyledBox = ({ children }) => {
  return (
    <Box
      sx={{
        border: 0,
        boxShadow: 2,
        borderRadius: '15px',
        bgcolor: '#F2F5FA',
        borderColor: 'black',
        color: 'black',
        minHeight: '200px',
        minWidth: '785px',
        maxWidth: '1012px',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        my: 3,
      }}
    >
      {children}
    </Box>
  );
};

export default StyledBox;
