/**
 * @file StyledBox.js
 * @description A reusable React component that wraps its children inside a styled Material-UI Box component. The box has customizable styles including border, box shadow, border radius, background color, and padding.
 * @module StyledBox
 * @requires react
 * @requires @mui/material/Box
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The content to be displayed inside the styled box.
 * @returns {JSX.Element} A styled Material-UI Box containing the provided children elements.
 * @example
 * // Example usage of StyledBox
 * <StyledBox>
 *   <p>This is a content inside the styled box.</p>
 * </StyledBox>
 */


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
