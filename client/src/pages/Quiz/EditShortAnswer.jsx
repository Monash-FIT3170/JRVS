import React, { useState } from 'react';
import { useApi } from '../../context/ApiProvider.jsx';
import MenuBar from '../../components/MenuBar.jsx';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CreateShortAnswerQuestion = () => {
  const [questionText, setQuestionText] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const { postData } = useApi();
  const { quizId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questionText || !answer) {
      setError('Please provide both a question and an answer.');
      return;
    }

    try {
      const res = await postData('api/quizzes/' + quizId, { //Hardcoded
        questionText,
        answer,
        type: 'ShortAnswer'
      });
      const newQuestionId = res._id;

      navigate(`/question/${newQuestionId}`);
    } catch (error) {
      console.error('Question creation failed:', error);
      setError('Failed to create question. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#3CA3EE',
        overflow: 'auto',
      }}
    >
      <MenuBar />

      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          backgroundColor: '#3CA3EE',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '600px',
          }}
        >
          <Typography variant="h4" sx={{ paddingBottom: '25px', color: '#333' }}>
            Create Short Answer Question
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <TextField
              label="Question"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
              sx={{
                marginBottom: '15px',
                width: '100%',
                backgroundColor: 'white',
              }}
            />
            <TextField
              label="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              sx={{
                marginBottom: '15px',
                width: '100%',
                backgroundColor: 'white',
              }}
            />
            {error && (
              <Typography color="error" sx={{ marginBottom: '15px' }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: '20px',
                backgroundColor: '#FFC93C',
                ':hover': { backgroundColor: '#2196F3' },
              }}
            >
              Create Question
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateShortAnswerQuestion;
