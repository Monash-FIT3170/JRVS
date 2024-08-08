import { AppBar, Box, Button, Drawer, IconButton, Toolbar } from "@mui/material"
import MenuBar from "../../components/MenuBar"
import { useNavigate, useParams } from "react-router-dom";
import "./lessons.css"
import { useEffect, useState } from "react";
import { useApi } from "../../context/ApiProvider";

const EditLesson = () => {
    const navigate = useNavigate();
    const { getData, updateData } = useApi();
    const [lesson, setLesson] = useState([]);
    const [isLessonLoading, setIsLessonLoading] = useState(true);
    const { lessonId }  = useParams();

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

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

    // display lesson contents
    // buttons for types (text only, text + image, text + multiple images, list)
    // edit components for each
    // customise lesson locally
    // save button updates entry in database

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
                    alignItems: 'center',
                    bgcolor: 'white',
                    height: '100%',
                }}
            >
                
                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%' 
                    }}
                >
                    <Button variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, margin: '10px', marginTop: '20px', bgcolor: '#E0E0E0', color: 'black'}}>TEXT ONLY</Button>
                    <Button variant="contained" sx={{':hover': {backgroundColor: '#2196F3'}, margin: '10px', marginTop: '20px', bgcolor: '#E0E0E0', color: 'black'}}>LIST</Button>
                    <Button variant="contained" sx={{':hover': {backgroundColor: '#2196F3'}, margin: '10px', marginTop: '20px', bgcolor: '#E0E0E0', color: 'black'}}>TEXT + IMAGE</Button>
                    <Button variant="contained" sx={{':hover': {backgroundColor: '#2196F3'}, margin: '10px', marginTop: '20px', bgcolor: '#E0E0E0', color: 'black'}}>TEXT + MULTIPLE IMAGES</Button>
                </Box>
                <h1 style={{paddingBottom: '25px'}}>{isLessonLoading || !lesson.title ? 'loading...' : lesson.title.toUpperCase()}</h1>
                
            

            </Box>

            <AppBar position="fixed" elevation={0} sx={{ top: 'auto', bottom: 0, bgcolor: 'white' }}>
                <Toolbar>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingBottom: '10px',
                            paddingTop: '10px',
                        }}
                    >
                    <Button onClick={handleBackClick} variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, marginLeft: '60px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C'}}>Back</Button>
                    <Button variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, marginRight: '60px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C'}}>Save</Button>
                    </Box>
                </Toolbar>
            </AppBar>

        </Box>
    )
}

export default EditLesson;