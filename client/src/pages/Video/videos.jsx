import { useApi } from '../../context/ApiProvider.jsx';
import MenuBar from "../../components/MenuBar.jsx";
import VideoBox from '../../components/videoComponents/videoBox.jsx';
import { Box, Button } from '@mui/material';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './videos.css'
import Submitted from "../../components/quizComponents/Submitted.jsx";
import { useNavigate } from 'react-router-dom';

function Videos() {


    const { getData } = useApi();
    const [video, setVideo] = useState([]);
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const { videoId }  = useParams();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const responseData = await getData('api/videos/' + videoId);
          setVideo(responseData);
          setIsVideoLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [getData, videoId])
    
    const submitForm = () => {
        navigate(-1);

    };


    return (
        <Box
            sx={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                backgroundColor: '#3CA3EE',
            }}
        >
            
            <Box sx={{padding: '10px'}}><MenuBar/></Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -100
                }}
            >
                <h1 style={{paddingBottom: '25px'}} className="title-font">{isVideoLoading ? 'loading...' : video.title.toUpperCase()}</h1>
                <h1 style={{paddingBottom: '25px'}} className="video-heading-font">{isVideoLoading ? 'loading...' : video.heading}</h1>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {isVideoLoading ? <p style={{padding: '10px'}}>loading...</p> : <VideoBox url={video.url}/>}
                </Box>
            </Box>
            
            <Box
                sx={{
   
                    bottom: 1000,
                    left:1200,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: '60px'
                }}
            >
                
            <Button onClick={submitForm} variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, marginRight: '60px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C'}}>RETURN TO LEARNING PATH</Button>
            </Box>
        </Box>
    );
}

export default Videos