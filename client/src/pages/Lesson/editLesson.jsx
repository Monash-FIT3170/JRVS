import { AppBar, Box, Button, CircularProgress, Fade, Snackbar, TextField, Toolbar } from "@mui/material"
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
import NotesIcon from '@mui/icons-material/Notes';
import ListIcon from '@mui/icons-material/List';
import ImageIcon from '@mui/icons-material/Image';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';


function shortenString(str, maxLength) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    }
    return str;
}

const EditLesson = () => {
    const navigate = useNavigate();
    const { getData, updateData } = useApi();
    const [lesson, setLesson] = useState({ title: "", content: []});
    const [initialLesson, setInitialLesson] = useState({ title: "", content: []});
    const [isLessonLoading, setIsLessonLoading] = useState(true);
    const { lessonId }  = useParams();
    const bottomRef = useRef(null);
    const topRef = useRef(null);
    const [currentTitle, setCurrentTitle] = useState("");
    const [titleChanged, setTitleChanged] = useState(false);
    const [editMade, setEditMade] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [showList, setShowList] = useState(false);
    const sectionRefs = useRef([]);

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
        window.addEventListener('scroll', handleScrollPosition);
        return () => {
            window.removeEventListener('scroll', handleScrollPosition);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const responseData = await getData('api/lessons/' + lessonId);
            setLesson(responseData);
            setInitialLesson(responseData);
            setCurrentTitle(responseData.title);
            setIsLessonLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
    }, [getData, lessonId])

    const saveEdit = async () => {
        try {
            await updateData(`api/lessons/${lessonId}`, lesson);
            setEditMade(false);
            setOpenSnackBar(true);
            setInitialLesson(lesson);
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

    const revertChanges = useCallback(() => {
        setLesson(initialLesson);
        setCurrentTitle(initialLesson.title);
        setEditMade(false);
        setTitleChanged(false);
    }, [initialLesson]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '100vw',
                backgroundColor: '#3CA3EE',
            }}
        >
            <div ref={topRef}></div>
            <Box sx={{padding: '10px'}}><MenuBar title="Edit Lesson" subtitle={lesson.title || "Loading..."} /></Box>
            
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
                        position: 'sticky',
                        top: 0,
                        bgcolor: 'rgba(255,255,255, 0.8)',
                        zIndex: 100,
                        padding: '20px',
                    }}
                >
                    <Button startIcon={<AddIcon/>} onClick={() => addContent("textBox")} variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#3CA3EE'}, marginLeft: '10px', bgcolor: '#C0C0C0', color: 'black'}}>TEXT ONLY</Button>
                    <Button startIcon={<AddIcon/>} onClick={() => addContent("listBox")} variant="contained" sx={{':hover': {backgroundColor: '#3CA3EE'}, marginLeft: '10px', bgcolor: '#C0C0C0', color: 'black'}}>LIST</Button>
                    <Button startIcon={<AddIcon/>} onClick={() => addContent("imageTextBox")} variant="contained" sx={{':hover': {backgroundColor: '#3CA3EE'}, marginLeft: '10px', bgcolor: '#C0C0C0', color: 'black'}}>TEXT & IMAGE</Button>
                    <Button startIcon={<AddIcon/>} onClick={() => addContent("multipleImageTextBox")} variant="contained" sx={{':hover': {backgroundColor: '#3CA3EE'}, marginLeft: '10px', bgcolor: '#C0C0C0', color: 'black'}}>TEXT & GALLERY</Button>
                    <Button startIcon={<HistoryIcon/>} disabled={!editMade} onClick={() => revertChanges()} variant="contained" sx={{':hover': {backgroundColor: '#6c757d'}, marginLeft: '10px', bgcolor: '#F88379', color: 'black'}}>REVERT</Button>
                </Box>
                {isLessonLoading && <CircularProgress size={80} disableShrink sx={{color: '#3CA3EE', marginTop: '20px'}}/>}
                {!isLessonLoading &&
                <Box sx={{width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden'}}>
                    <Box sx={{borderRadius: '5px', bgcolor: '#3CA3EE', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', width: '50%', padding: '20px', marginBottom: '20px'}}>
                        <Box sx={{marginBottom: '40px'}}><h2 className="heading-font">Title</h2></Box>
                        <TextField onChange={handleTitleChange} required multiline minRows={1} maxRows={2} variant="outlined" label="Title" value={currentTitle || ""} sx={{width: '100%', marginBottom: '20px'}}/><Button startIcon={<EditIcon/>} variant="contained" onClick={() => changeLessonTitle(currentTitle)} disabled={!titleChanged} >EDIT</Button>
                    </Box>
                    {lesson.content && lesson.content.map((section, index) => {
                        const uniqueKey = `${section.type}${index}${new Date().getTime()}`;
                        return (<Box sx={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center'}} key={uniqueKey} ref={(el) => (sectionRefs.current[index] = el)}>
                            {section.type === "textBox" &&
                                <EditTextBox key={uniqueKey} heading={section.heading} text={section.text} index={index} updateContent={updateContent}/>}
                            {section.type === "listBox" &&
                                <EditListBox key={uniqueKey} heading={section.heading} points={section.points} index={index} updateContent={updateContent}/>}
                            {section.type === "imageTextBox" &&
                                <EditImageTextBox key={uniqueKey} heading={section.heading} text={section.text} imageSrc={section.imageSrc} index={index} updateContent={updateContent}/>}
                            {section.type === "multipleImageTextBox" &&
                                <EditMultipleImageTextBox key={uniqueKey} heading={section.heading} text={section.text} imageSrcs={section.imageSrcs} index={index} updateContent={updateContent}/>}
                            <EditOptionsBox deleteContent={deleteContent} moveUp={moveUp} moveDown={moveDown} index={index}/>
                        </Box>)
                    })
                    }
                    
                </Box>
                }
                <div ref={bottomRef}></div>
            </Box>


            <Fade in={showList} timeout={1000}><AppBar position="fixed" elevation={0} sx={{':hover': {opacity: 1}, top: 'auto', left: 0, bgcolor: 'transparent', height: '100vh', justifyContent: 'center', pointerEvents: 'none'}}>
                <Toolbar>
                    <Box
                        sx={{
                            ':hover': {opacity: 1, transition: 'opacity 0.3s ease-in-out'},
                            width: '15%',
                            maxHeight: '60vh',
                            display: 'flex',
                            flexDirection: 'column',
                            opacity: 0.8,
                            bgcolor: '#343A40',
                            padding: '10px',
                            borderRadius: '5px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            overflow: 'auto',
                            pointerEvents: 'auto'
                        }}
                    >
                        <Button variant="text"  onClick={() => topRef.current?.scrollIntoView({left: '70px', behavior: 'smooth'})} sx={{':hover': {backgroundColor: '#495057'}, marginBottom: '5px', bgcolor: '#343A40', pointerEvents: 'auto', color: 'white'}}>Start</Button>
                        {lesson.content && lesson.content.map((section, index) => {
                            return <Button startIcon={
                            (section.type === "textBox" && <NotesIcon />) ||
                            (section.type === "imageTextBox" && <ImageIcon />) ||
                            (section.type === "listBox" && <ListIcon />) ||
                            (section.type === "multipleImageTextBox" && <BurstModeIcon />)
                            } variant="text" onClick={() => handleScroll(index)} sx={{':hover': {backgroundColor: '#495057'}, marginBottom: '5px', bgcolor: '#343A40', pointerEvents: 'auto', textTransform: 'Capitalize', color: 'white', justifyContent: 'flex-start'}}>{shortenString(section.heading, 12) || "New Content"}
                            </Button>
                        })
                        }
                        <Button variant="text" onClick={() => bottomRef.current?.scrollIntoView({behavior: 'smooth'})} sx={{':hover': {backgroundColor: '#495057'}, bgcolor: '#343A40', pointerEvents: 'auto', color: 'white'}}>End</Button>
                    </Box>
                </Toolbar>
            </AppBar></Fade>

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
            <Snackbar sx={{'& .MuiSnackbarContent-root': {justifyContent: 'center'},}} open={openSnackBar} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} message="Lesson Saved." autoHideDuration={4000}/>
        </Box>
    )
}

export default EditLesson;