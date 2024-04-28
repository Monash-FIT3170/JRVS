import Navbar from "../../Components/navbar/Navbar";
import { AppBar, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios"
import "./lessons.css"
import TextBox from "../../Components/contentTypes/textBox";
import Carousel from "../../Components/content/contentCarousal";
import ImageTextBox from "../../Components/contentTypes/imageTextBox";
import BotBox from "../../Components/content/botBox";

function Lessons() {

    const [lesson, setLesson] = useState([]);
    const lessonId = '662da929a3144336a01c1c6b'

    useEffect(() => {
        axios.get("http://localhost:5000/api/lessons/" + lessonId)
        .then(response => setLesson(response.data))
        
        .catch(error => console.error(error));
    }, []);

    console.log(lesson.content)
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
                        <h1 className="sarala-font-container">✨{lesson.title}✨</h1>
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
                zIndex: 9999,
            }}>
                <BotBox/>
                <Carousel boxes={contentBoxes}></Carousel>
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
                <Button variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, marginRight: '60px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C'}}>Next</Button>
            </Box>
        </Box>
    );
}

export default Lessons