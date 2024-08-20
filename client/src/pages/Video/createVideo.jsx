import React, { useState } from 'react';
import { useApi } from '../../context/ApiProvider.jsx';
import MenuBar from '../../components/MenuBar.jsx';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef } from "react";

const CreateVideo = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [heading, setHeading] = useState('');
  const [error, setError] = useState('');
  const { postData } = useApi();
  const navigate = useNavigate();
  const { getData, updateData } = useApi();
  const [video, setVideo] = useState({ title: "", content: []});
  const [initialVideo, setInitialVideo] = useState({ title: "", heading:"",url: ""});
  const [isLessonLoading, setIsLessonLoading] = useState(true);
  const { videoId }  = useParams();
  const bottomRef = useRef(null);
  const topRef = useRef(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentHeading, setCurrentHeading] = useState("");
  const [titleChanged, setTitleChanged] = useState(false);
  const [editMade, setEditMade] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [showList, setShowList] = useState(false);
  const sectionRefs = useRef([]);

 /* const handleSubmit = async (e) => {
    e.preventDefault();

    const urlPattern = /^https?:\/\/(www\.)?youtube\.com\/embed\?[\w-]+$/;
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
  */

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
};


const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpenSnackBar(false);
};

const handleScroll = (index) => {
  sectionRefs.current[index].scrollIntoView({ behavior: 'smooth' });
};

const handleScrollPosition = () => {
  if (window.scrollY > 0) {
      setShowList(true);
  } else {
      setShowList(false);
  }
};



useEffect(() => {
  const fetchData = async () => {
    try {

      const responseData = await getData('api/videos/' + videoId);
      setVideo(responseData);
      setVideo(responseData);
      setCurrentTitle(responseData.title);
      setCurrentUrl(responseData.url);
      setCurrentHeading(responseData.heading);
      setIsLessonLoading(false);

    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [getData, videoId])



const saveEdit = async () => {
  try {
      video.heading = currentHeading;
      await updateData(`api/videos/${videoId}`, video);
  } catch (error) {
      console.log('Error updating of lesson', error);
  }
}

const changeLessonTitle = useCallback((newTitle) => {
  if (video.title && video.title !== newTitle) {
      setVideo({...video, title: newTitle});
      setTitleChanged(false);
      setEditMade(true);
  }
}, [video])



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
        <form onSubmit={saveEdit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <TextField
            label="Title"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            required
            sx={{
              marginBottom: '15px',
              width: '100%',
              backgroundColor: 'white',
            }}
          />
          <TextField
            label="URL"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
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
            value={currentHeading}
            onChange={(e) => setCurrentHeading(e.target.value)}
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
