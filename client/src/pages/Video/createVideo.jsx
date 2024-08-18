import React, { useState } from 'react';
import { useApi } from '../../context/ApiProvider.jsx';
import MenuBar from '../../components/MenuBar.jsx';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateVideo = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [heading, setHeading] = useState('');
  const [error, setError] = useState('');
  const { postData } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlPattern = /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+$/;
    if (!urlPattern.test(url)) {
      setError('Please enter a valid YouTube URL.');
      return;
    }

    const embedUrl = url.replace("watch?v=", "embed/");
    try {
      const res = await postData('api/videos', { title, url: embedUrl, heading });
      const newVideoId = res._id;

      navigate(`/video/${newVideoId}`);
    } catch (error) {
      console.error('Video creation failed:', error);
      setError('Failed to create video. Please try again.');
    }
  };

  return (

    <Box sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#3CA3EE',
        overflow: 'auto'
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
          Edit Video Lesson
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{
              marginBottom: '15px',
              width: '100%',
              backgroundColor: 'white',
            }}
          />
          <TextField
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            helperText="Enter a valid YouTube video URL."
            sx={{
              marginBottom: '15px',
              width: '100%',
              backgroundColor: 'white',
            }}
          />
          <TextField
            label="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
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
            Update Video
          </Button>
        </form>
      </Box>
    </Box>
    </Box>
  );
};

export default CreateVideo;
