import { AppBar, Toolbar, Button, Box, Grid, LinearProgress } from "@mui/material";
import { height, styled } from '@mui/system';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./lessons.css"
import TextBox from "../../components/contentTypes/textBox";
import ListBox from "../../components/contentTypes/listBox.jsx"
import MultipleImageTextBox from "../../components/contentTypes/multipleImageTextBox.jsx";
import Carousel from "../../components/content/contentCarousal";
import ImageTextBox from "../../components/contentTypes/imageTextBox";
import BotBox from "../../components/content/botBox";

import { useApi } from '../../context/ApiProvider.jsx';
import MenuBar from "../../components/MenuBar.jsx";

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 5,
    '& .MuiLinearProgress-bar': {
        borderRadius: 5,
        backgroundColor: '#FFC93C',
    },
}));

const normalise = (value, min, max) => ((value - min) * 100) / (max - min);

function Lessons() {


    const { getData } = useApi();
    const [lesson, setLesson] = useState([]);
    const [isLessonLoading, setIsLessonLoading] = useState(true);
    const { lessonId }  = useParams();
  
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
    }, [getData, lessonId])


    const [hasFinishedCarousel, setHasFinishedCarousel] = useState(false);
    const [onIntroduction, setOnIntroduction] = useState(true);
    const [seenNum, setSeenNum] = useState(1);

    const handleStatus = (status) => {
        setHasFinishedCarousel(status);
    }

    const handleIntroStatus = (status) => {
        setOnIntroduction(status);
    }

    const handleProgress = (seenNum) => {
        setSeenNum(seenNum);
    }
    
    //console.log(lesson.content)
    let contentBoxes = () => {return <></>}

    if (lesson.content) {
        contentBoxes = lesson.content.map((contentObject) => {
            if (contentObject.type === 'textBox') {
                return <TextBox text={contentObject.text} heading={contentObject.heading}></TextBox>
            } else if (contentObject.type === 'imageTextBox') {
                return <ImageTextBox text={contentObject.text} imageSrc={contentObject.imageSrc} heading={contentObject.heading}></ImageTextBox>
            } else if (contentObject.type === 'listBox') {
                return <ListBox points={contentObject.points} heading={contentObject.heading}></ListBox>
            } else if (contentObject.type === 'multipleImageTextBox') {
                return <MultipleImageTextBox imageSrcs={contentObject.imageSrcs} heading={contentObject.heading} text={contentObject.text}></MultipleImageTextBox>
            } else return <></>;
        })
    }

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
                <h1 style={{paddingBottom: '25px'}} className="title-font">{isLessonLoading ? 'loading...' : lesson.title.toUpperCase()}</h1>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {onIntroduction ? <BotBox/> : <></>}
                    {isLessonLoading ? <p style={{padding: '10px'}}>loading...</p> : <Carousel boxes={contentBoxes} onStatus={handleStatus} onIntroduction={handleIntroStatus} onSeenNum={handleProgress}></Carousel>}
                </Box>
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
                <Button href="/learningPath" variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, marginLeft: '60px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C'}}>Back</Button>
                <Box sx={{display: 'flex', width: '25%', alignItems: 'center'}}>
                    <CustomLinearProgress sx={{width: '100%'}}  variant="determinate" value={normalise(seenNum, 1, contentBoxes.length)}/>
                    <h1 style={{paddingLeft: '10px'}} className="progress-font">{normalise(seenNum, 1, contentBoxes.length)}%</h1>
                </Box>
                <Button href="/learningPath" variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, marginRight: '60px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C', visibility: hasFinishedCarousel ? 'visible' : 'hidden'}}>Next</Button>
            </Box>
        </Box>
    );
}

export default Lessons