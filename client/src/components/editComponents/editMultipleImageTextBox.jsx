import { Box, Button, IconButton, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import './editComponents.css'
import { useState } from "react";


export default function EditMultipleImageTextBox({heading, text, imageSrcs, index, updateContent}) {

    const [headingChanged, setHeadingChanged] = useState(false);
    const [textChanged, setTextChanged] = useState(false);
    const [imageSrcsChanged, setImageSrcsChanged] = useState(false);
    const [currentHeading, setCurrentHeading] = useState(heading);
    const [currentText, setCurrentText] = useState(text);
    const [currentImageSrcs, setCurrentImageSrcs] = useState(imageSrcs);

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
            <Box sx={{ padding: '20px'}}><h2 className="heading-font">{index + 1}. Text + Multiple Images</h2></Box>
            <Box sx={{padding: '20px'}}>
                <h2 className="text-font">Heading</h2>
                <TextField onChange={handleHeadingChange} fullWidth required variant="outlined" label="Heading" defaultValue={heading || ""} sx={{marginBottom: '20px', marginTop: '8px'}} />

                <h2 className="text-font">Text Content</h2>
                <TextField onChange={handleTextChange} fullWidth required multiline variant="outlined" label="Text" minRows={5} defaultValue={text || ""} sx={{marginTop: '8px', marginBottom: '20px'}} />

                <h2 className="text-font">Image Links</h2>
                {currentImageSrcs && currentImageSrcs.map((imageSrc, index) => (
                    <TextField onChange={(event) => handleImageSrcChange(event, index)} fullWidth required multiline variant="outlined" label={"Image Link " + (index + 1)} minRows={1} defaultValue={imageSrc ? imageSrc : ""} sx={{ marginTop: '10px'}} key={index}/>
                ))}
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '8px'}}>
                    {currentImageSrcs && currentImageSrcs.length > 0 && <IconButton onClick={handleImageSrcRemove}><RemoveCircleIcon sx={{color: 'black'}}/></IconButton>}
                    <IconButton onClick={handleImageSrcAdd}><AddCircleIcon sx={{color: 'black'}}/></IconButton>
                </Box>
            </Box>
            <Box sx={{padding: '20px'}}><Button variant="contained" onClick={handleSave} disabled={!headingChanged && !textChanged && !imageSrcsChanged} >SAVE</Button></Box>
        </Box>
    )
}
