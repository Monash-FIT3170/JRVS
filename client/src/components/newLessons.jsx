import React, { useState } from 'react';
import { Box, Button, Typography, MenuItem, Menu, Grid, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NewLessons = () => {
  const [open, setOpen] = useState(false);
  const [quizAnchorEl, setQuizAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleQuizClick = (event) => {
    setQuizAnchorEl(event.currentTarget);
  };

  const handleQuizClose = () => {
    setQuizAnchorEl(null);
  };

  const handleOptionClick = (path) => {
    handleClose();
    navigate(path);
  };

  return (
    <>
        <Button 
          variant="contained" 
          onClick={handleOpen} 
          sx={{ 
            backgroundColor: '#3CA3EE',
            color: 'white',
            ':hover': {
              backgroundColor: '#2196F3',
            },
            marginBottom: '20px',
          }}
        >
          Create New Lesson
        </Button>
        
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: 24,
              width: '300px',
              textAlign: 'center',
              margin: 'auto',
              marginTop: '10%',
              outline: 'none',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 'bold', color: '#3CA3EE' }}>
              Create New Lesson
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  onClick={() => handleOptionClick('/createReading')} 
                  sx={{
                    color: '#2196F3',
                    borderColor: '#2196F3',
                    marginBottom: '10px',
                    ':hover': {
                      backgroundColor: '#f0f0f0',
                      borderColor: '#2196F3',
                    },
                  }}
                >
                  Reading
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  onClick={() => handleOptionClick('/video/createVideo')} 
                  sx={{
                    color: '#2196F3',
                    borderColor: '#2196F3',
                    marginBottom: '10px',
                    ':hover': {
                      backgroundColor: '#f0f0f0',
                      borderColor: '#2196F3',
                    },
                  }}
                >
                  Video
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  onClick={handleQuizClick} 
                  sx={{
                    color: '#2196F3',
                    borderColor: '#2196F3',
                    ':hover': {
                      backgroundColor: '#f0f0f0',
                      borderColor: '#2196F3',
                    },
                  }}
                >
                  Quiz
                </Button>
              </Grid>
            </Grid>
            <Menu
              anchorEl={quizAnchorEl}
              open={Boolean(quizAnchorEl)}
              onClose={handleQuizClose}
              sx={{ mt: 1 }}
            >
              {['Multiple Choice', 'Reorder', 'Image', 'True or False', 'Drag & Drop', 'Short Answer'].map((quizType, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleOptionClick(`/quiz/${quizType.toLowerCase().replace(/ /g, '-')}/66c486234f26141048e554b8/questions/`)} //hardcoded
                  sx={{
                    ':hover': {
                      backgroundColor: '#3CA3EE',
                      color: 'white',
                    },
                  }}
                >
                  {quizType}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Modal>

    </>
  );
};

export default NewLessons;
