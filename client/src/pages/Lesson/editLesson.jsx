import { AppBar, Box, Button, Snackbar, TextField, Toolbar } from "@mui/material"
import MenuBar from "../../components/MenuBar"
import { useNavigate, useParams } from "react-router-dom";
import "./lessons.css"
import { useCallback, useEffect, useRef, useState } from "react";
import { useApi } from "../../context/ApiProvider";
import EditTextBox from "../../components/editComponents/editTextBox";
import EditListBox from "../../components/editComponents/editListBox";
import EditImageTextBox from "../../components/editComponents/editImageTextBox";
import EditMultipleImageTextBox from "../../components/editComponents/editMultipleImageTextBox";
import EditOptionsBox from "../../components/editComponents/editOptionsBox";
import AddIcon from '@mui/icons-material/Add';

const EditLesson = () => {
    const navigate = useNavigate();
    const { getData, updateData } = useApi();
    const [lesson, setLesson] = useState({ title: "", content: []});
    const [isLessonLoading, setIsLessonLoading] = useState(true);
    const { lessonId }  = useParams();
    const bottomRef = useRef(null);
    const [currentTitle, setCurrentTitle] = useState("");
    const [titleChanged, setTitleChanged] = useState(false);
    const [editMade, setEditMade] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackBar(false);
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const responseData = await getData('api/lessons/' + lessonId);
            setLesson(responseData);
            setCurrentTitle(responseData.title);
            setIsLessonLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
    }, [getData, lessonId])

    console.log(lesson)
    // display lesson contents
    // buttons for types (text only, text + image, text + multiple images, list)
    // edit components for each
    // customise lesson locally
    // save button updates entry in database

    const saveEdit = async () => {
        try {
            await updateData(`api/lessons/${lessonId}`, lesson);
            setEditMade(false);
            setOpenSnackBar(true);
        } catch (error) {
            console.log('Error updating of lesson', error);
        }
    }

    const handleTitleChange = (event) => {
        setCurrentTitle(event.target.value);
        if (event.target.value !== lesson.title) setTitleChanged(true);
        else setTitleChanged(false);
    }

    const changeLessonTitle = useCallback((newTitle) => {
        if (lesson.title && lesson.title !== newTitle) {
            setLesson({...lesson, title: newTitle});
            setTitleChanged(false);
            setEditMade(true);
        }
    }, [lesson])

    const addContent = useCallback((type) => {
        if (lesson.content) {
            let newContent;
            if (type === "textBox") {
                newContent = {
                    type: "textBox",
                    heading: "",
                    text: ""
                };
            } else if (type === "listBox") {
                newContent = {
                    type: "listBox",
                    heading: "",
                    points: [],
                };
            } else if (type === "imageTextBox") {
                newContent = {
                    type: "imageTextBox",
                    heading: "",
                    text: "",
                    imageSrc: ""
                };
            } else if (type === "multipleImageTextBox") {
                newContent = {
                    type: "multipleImageTextBox",
                    heading: "",
                    text: "",
                    imageSrcs: []
                };        
            }

            const updatedContent = [...lesson.content, newContent];
            setLesson({...lesson, content: updatedContent});
            setEditMade(true);

            setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: 'smooth'});
            }, 500) 
        }
    }, [lesson]);

    const deleteContent = useCallback((index) => {
        if (lesson.content) {
            const updatedContent = lesson.content.filter((_, i) => i !== index);
            setLesson({...lesson, content: updatedContent});
            setEditMade(true);
        }
    }, [lesson]);

    const moveUp = useCallback((index) => {
        if (lesson.content && index > 0) {
            const updatedContent = [...lesson.content];
            const prevItem = updatedContent[index - 1];
            updatedContent[index - 1] = updatedContent[index];
            updatedContent[index] = prevItem;
            setLesson({...lesson, content: updatedContent});
            setEditMade(true);
        }
    }, [lesson]);

    const moveDown = useCallback((index) => {
        if (lesson.content && index < lesson.content.length - 1) {
            const updatedContent = [...lesson.content];
            const nextItem = updatedContent[index + 1];
            updatedContent[index + 1] = updatedContent[index];
            updatedContent[index] = nextItem;
            setLesson({...lesson, content: updatedContent});
            setEditMade(true);
        }
    }, [lesson]);

    const updateContent = useCallback((index, newContent) => {
        if (lesson.content && index >= 0 && index < lesson.content.length) {
            const updatedContent = [...lesson.content];
            updatedContent[index] = newContent;
            setLesson({...lesson, content: updatedContent});
            setEditMade(true);
        }
    }, [lesson])

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
                        width: '100%',
                        marginTop: '20px'
                    }}
                >
                    <Button startIcon={<AddIcon/>} onClick={() => addContent("textBox")} variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#3CA3EE'}, marginLeft: '10px', bgcolor: '#C0C0C0', color: 'black'}}>TEXT ONLY</Button>
                    <Button startIcon={<AddIcon/>} onClick={() => addContent("listBox")} variant="contained" sx={{':hover': {backgroundColor: '#3CA3EE'}, marginLeft: '10px', bgcolor: '#C0C0C0', color: 'black'}}>LIST</Button>
                    <Button startIcon={<AddIcon/>} onClick={() => addContent("imageTextBox")} variant="contained" sx={{':hover': {backgroundColor: '#3CA3EE'}, marginLeft: '10px', bgcolor: '#C0C0C0', color: 'black'}}>TEXT + IMAGE</Button>
                    <Button startIcon={<AddIcon/>} onClick={() => addContent("multipleImageTextBox")} variant="contained" sx={{':hover': {backgroundColor: '#3CA3EE'}, marginLeft: '10px', bgcolor: '#C0C0C0', color: 'black'}}>TEXT + MULTIPLE IMAGES</Button>
                </Box>

                {!isLessonLoading &&
                <Box sx={{width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden'}}>
                    <Box sx={{borderRadius: '5px', bgcolor: '#3CA3EE', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', width: '50%', padding: '20px', marginBottom: '20px', marginTop: '20px'}}>
                        <Box sx={{marginBottom: '40px'}}><h2 className="heading-font">Title</h2></Box>
                        <TextField onChange={handleTitleChange} required variant="outlined" label="Title" defaultValue={lesson.title ? lesson.title : ""} sx={{width: '100%', marginBottom: '20px'}}/><Button variant="contained" onClick={() => changeLessonTitle(currentTitle)} disabled={!titleChanged} >SAVE</Button>
                    </Box>
                    {lesson.content && lesson.content.map((section, index) => {
                        const uniqueKey = `${section.type}${index}${new Date().getTime()}`;
                        if (section.type === "textBox") {
                            return <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', marginLeft: '70px'}} key={uniqueKey}><EditTextBox key={uniqueKey} heading={section.heading} text={section.text} index={index} updateContent={updateContent}/><EditOptionsBox deleteContent={deleteContent} moveUp={moveUp} moveDown={moveDown} index={index}/></Box>
                        } else if (section.type === "listBox") {
                            return <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', marginLeft: '70px'}} key={uniqueKey}><EditListBox key={uniqueKey} heading={section.heading} points={section.points} index={index} updateContent={updateContent}/><EditOptionsBox deleteContent={deleteContent} moveUp={moveUp} moveDown={moveDown} index={index}/></Box>
                        } else if (section.type === "imageTextBox") {
                            return <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', marginLeft: '70px'}} key={uniqueKey}><EditImageTextBox key={uniqueKey} heading={section.heading} text={section.text} imageSrc={section.imageSrc} index={index} updateContent={updateContent}/><EditOptionsBox deleteContent={deleteContent} moveUp={moveUp} moveDown={moveDown} index={index}/></Box>
                        } else if (section.type === "multipleImageTextBox") {
                            return <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', marginLeft: '70px'}} key={uniqueKey}><EditMultipleImageTextBox key={uniqueKey} heading={section.heading} text={section.text} imageSrcs={section.imageSrcs} index={index} updateContent={updateContent}/><EditOptionsBox deleteContent={deleteContent} moveUp={moveUp} moveDown={moveDown} index={index}/></Box>
                        } else {
                            return <></>
                        }
                    })
                    }
                    
                </Box>
                }
                <div ref={bottomRef}></div>
            </Box>

            <AppBar position="fixed" elevation={0} sx={{ top: 'auto', bottom: 0, bgcolor: 'transparent', height: '100px', justifyContent: 'center', pointerEvents: 'none'}}>
                <Toolbar>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Button onClick={handleBackClick} variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, marginLeft: '20px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C', pointerEvents: 'auto'}}>Back</Button>
                        <Button onClick={saveEdit} disabled={!editMade} variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, marginRight: '20px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C', pointerEvents: 'auto'}}>Save All</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Snackbar sx={{'& .MuiSnackbarContent-root': {justifyContent: 'center'},}} open={openSnackBar} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} message="Lesson Edited." autoHideDuration={4000}/>
        </Box>
    )
}

export default EditLesson;