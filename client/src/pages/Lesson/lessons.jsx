import { AppBar, Toolbar, Button, Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import "./lessons.css"
import TextBox from "../../components/contentTypes/textBox";
import Carousel from "../../components/content/contentCarousal";
import ImageTextBox from "../../components/contentTypes/imageTextBox";
import BotBox from "../../components/content/botBox";

import { useApi } from '../../context/ApiProvider.jsx';

function Lessons() {


    const { getData, postData } = useApi();
    const [lesson, setLesson] = useState([]);
    const [isLessonLoading, setIsLessonLoading] = useState(true);
    const lessonId = '662da929a3144336a01c1c6b' // would need to get lesson id from path map node
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const responseData = await getData('api/lessons/' + lessonId);
          setLesson(responseData);
          setIsLessonLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [getData])

    const handleUpdatePoints = async () => {
        try {
            const updatedUser = await postData('api/users/updatePoints', { username: 'testuser' });
            console.log('Points updated:', updatedUser.points); // Console log the updated points
        } catch (error) {
            console.error('Failed to update points:', error);
        }
    };


    const [hasFinishedCarousel, setHasFinishedCarousel] = useState(false);

    const handleStatus = (status) => {
        setHasFinishedCarousel(status);
    }
    
    //console.log(lesson.content)
    let contentBoxes = () => {return <></>}

    if (lesson.content) {
        contentBoxes = lesson.content.map((contentObject) => {
            if (contentObject.type === 'textBox') {
                return <TextBox text={contentObject.text}></TextBox>
            } else if (contentObject.type === 'imageTextBox') {
                return <ImageTextBox text={contentObject.text} imageSrc={contentObject.imageSrc}></ImageTextBox>
            }
            return <></>
        })
    }

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#FFFDFD',
            }}
        >
            <AppBar position="static" elevation={0} sx={{padding: '60px', backgroundColor: '#FFFDFD'}}>
                <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <h1 className="saira-font-container">JRVS</h1>
                    </Grid>
                    <Grid item>
                        <h1 className="sarala-font-container">✨{isLessonLoading ? 'loading...' : lesson.title}✨</h1>
                    </Grid>
                    <Grid item>
                        <Button className="button-font" variant="contained" sx={{backgroundColor: '#2196F3'}}>Profile</Button>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>
            
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                
            }}>
                <BotBox/>
                {isLessonLoading ? <p style={{padding: '10px'}}>loading...</p> : <Carousel boxes={contentBoxes} onStatus={handleStatus}></Carousel>}
            </Box>
            
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: '60px'
                }}
            >
                <Button variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, marginLeft: '60px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C'}}>Back</Button>
                {hasFinishedCarousel && (
                <>
                <Box sx={{ display: 'flex', marginRight: '60px' }}> {/* New container for multiple buttons */}
                    <Button variant="contained" cis lassName="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, marginRight: '10px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C'}}>Next</Button>
                    <Button variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C'}} onClick = {handleUpdatePoints}>Submit</Button>
                </Box>
            </>
            )}
            </Box>
        </Box>
    );
}

export default Lessons