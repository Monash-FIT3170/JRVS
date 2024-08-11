import { AppBar, Box, Button, Drawer, IconButton, TextField, Toolbar } from "@mui/material"
import MenuBar from "../../components/MenuBar"
import { useNavigate, useParams } from "react-router-dom";
import "./lessons.css"
import { useEffect, useState } from "react";
import { useApi } from "../../context/ApiProvider";
import EditTextBox from "../../components/editComponents/editTextBox";
import EditListBox from "../../components/editComponents/editListBox";

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
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '100vw',
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
                    justifyContent: 'center',
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

                {!isLessonLoading &&
                <Box sx={{width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'auto'}}>
                    <Box sx={{borderRadius: '5px', borderWidth: '2px', borderColor: 'black', width: '50%', padding: '20px', marginBottom: '20px', marginTop: '20px'}}>
                        <Box sx={{marginBottom: '40px'}}><h2 className="heading-font">Title</h2></Box>
                        <TextField required variant="outlined" label="Title" defaultValue={lesson.title ? lesson.title : ""} sx={{width: '100%'}}/>
                    </Box>
                    <EditTextBox/>
                    <EditListBox/>
                </Box>
                }

            </Box>

            <AppBar position="fixed" elevation={0} sx={{ top: 'auto', bottom: 0, bgcolor: 'transparent', height: '100px', justifyContent: 'center' }}>
                <Toolbar>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Button onClick={handleBackClick} variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, marginLeft: '20px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C'}}>Back</Button>
                        <Button variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, marginRight: '20px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C'}}>Save</Button>
                    </Box>
                </Toolbar>
            </AppBar>

        </Box>
    )
}

export default EditLesson;