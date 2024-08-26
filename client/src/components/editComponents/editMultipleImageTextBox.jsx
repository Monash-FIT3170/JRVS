import { Box, Button, IconButton, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import './editComponents.css'
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';


export default function EditMultipleImageTextBox({heading, text, imageSrcs, index, updateContent}) {

    const [headingChanged, setHeadingChanged] = useState(false);
    const [textChanged, setTextChanged] = useState(false);
    const [imageSrcsChanged, setImageSrcsChanged] = useState(false);
    const [currentHeading, setCurrentHeading] = useState(heading);
    const [currentText, setCurrentText] = useState(text);
    const [currentImageSrcs, setCurrentImageSrcs] = useState(imageSrcs);
    const [isValid, setIsValid] = useState(false);

    const handleHeadingChange = (event) => {
        setCurrentHeading(event.target.value);
        if (event.target.value !== heading) setHeadingChanged(true);
        else setHeadingChanged(false);
    }

    const handleImageSrcChange = (event, index) => {
        if (event.target.value !== imageSrcs[index]) {
            setImageSrcsChanged(true);
            const updatedImageSrcs = currentImageSrcs.map((imageSrc, i) => i === index ? event.target.value : imageSrc);
            setCurrentImageSrcs(updatedImageSrcs);
        } else setImageSrcsChanged(false);
    }

    const handleTextChange = (event) => {
        setCurrentText(event.target.value);
        if (event.target.value !== text) setTextChanged(true);
        else setTextChanged(false);
    }

    const handleImageSrcAdd = () => {
        const newImageSrc = "";
        setCurrentImageSrcs([...currentImageSrcs, newImageSrc]);
        setImageSrcsChanged(true);
    }

    const handleImageSrcRemove = () => {
        setCurrentImageSrcs(currentImageSrcs.slice(0, -1));
        setImageSrcsChanged(true);
    }

    const handleSave = () => {
        updateContent(index, {
            type: "multipleImageTextBox",
            heading: currentHeading,
            text: currentText,
            imageSrcs: currentImageSrcs
        });
        setHeadingChanged(false);
        setTextChanged(false);
    }

    // validate image urls
    useEffect(() => {
        let componentMounted = true;
        const validateImages = async () => {
            const results = await Promise.all(
                currentImageSrcs.map((src) => {
                    return new Promise((resolve) => {
                        const image = new Image();
                        image.src = src;
                        image.onload = () => resolve(true);
                        image.onerror = () => resolve(false);
                    });
                })
            );
            if (componentMounted) {
                setIsValid(results.every((result) => result));
            }
        };
        validateImages();
        return () => {componentMounted = false};
    }, [currentImageSrcs]);

    return (
        <Box 
            sx={{
                bgcolor: '#3CA3EE',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                width: '50%',
                borderRadius: '5px',
                marginBottom: '20px',
                marginLeft: '70px'
            }}
        >
            <Box sx={{ padding: '20px'}}><h2 className="heading-font">{index + 1}. Text & Gallery</h2></Box>
            <Box sx={{padding: '20px'}}>
                <h2 className="text-font">Heading</h2>
                <TextField onChange={handleHeadingChange} fullWidth minRows={1} maxRows={3} required variant="outlined" defaultValue={heading || ""} sx={{'& .MuiOutlinedInput-root': {backgroundColor: '#F9F6EE', '& fieldset': {border: '0'}, '&:hover': {backgroundColor: '#C0C0C0'}, '&:hover fieldset:': {border: '0'}, '&.Mui-focused fieldset': {border: '0'}}, marginBottom: '20px', marginTop: '4px'}} />

                <h2 className="text-font">Text Content</h2>
                <TextField onChange={handleTextChange} fullWidth required multiline variant="outlined" rows={6} maxRows={6} defaultValue={text || ""} sx={{'& .MuiOutlinedInput-root': {backgroundColor: '#F9F6EE', '& fieldset': {border: '0'}, '&:hover': {backgroundColor: '#C0C0C0'}, '&:hover fieldset:': {border: '0'}, '&.Mui-focused fieldset': {border: '0'}}, marginTop: '4px', marginBottom: '20px'}} />

                <h2 className="text-font">Image Links</h2>
                {currentImageSrcs && currentImageSrcs.map((imageSrc, index) => (
                    <TextField onChange={(event) => handleImageSrcChange(event, index)} fullWidth  multiline variant="filled" label={"Image Link " + (index + 1)} minRows={1} maxRows={2} defaultValue={imageSrc ? imageSrc : ""} sx={{'& .MuiFilledInput-root': {backgroundColor: '#F9F6EE', '& fieldset': {border: '0'}, '&:hover': {backgroundColor: '#C0C0C0'}, '&:hover fieldset:': {border: '0'}, '&.Mui-focused fieldset': {border: '0'}}, marginTop: '10px'}} key={index}/>
                ))}
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '8px'}}>
                    {currentImageSrcs && currentImageSrcs.length > 0 && <IconButton onClick={handleImageSrcRemove}><RemoveCircleIcon sx={{color: 'black'}}/></IconButton>}
                    <IconButton onClick={handleImageSrcAdd}><AddCircleIcon sx={{color: 'black'}}/></IconButton>
                </Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', padding: '20px', alignItems: 'center'}}><Button variant="contained" startIcon={<EditIcon/>} onClick={handleSave} disabled={(!headingChanged && !textChanged && !imageSrcsChanged) || !isValid} >EDIT</Button>
            {(!isValid && imageSrcsChanged) && <h2 className="error-font" style={{marginLeft: '5px'}}>Invalid Image Links</h2>}
            </Box>
        </Box>
    )
}