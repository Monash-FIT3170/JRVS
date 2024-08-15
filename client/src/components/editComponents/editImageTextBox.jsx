import { Box, Button, TextField } from "@mui/material";
import './editComponents.css'
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';


export default function EditImageTextBox({heading, text, imageSrc, index, updateContent}) {

    const [headingChanged, setHeadingChanged] = useState(false);
    const [textChanged, setTextChanged] = useState(false);
    const [imageSrcChanged, setImageSrcChanged] = useState(false)
    const [currentHeading, setCurrentHeading] = useState(heading);
    const [currentText, setCurrentText] = useState(text);
    const [currentImageSrc, setCurrentImageSrc] = useState(imageSrc);
    const [isValid, setIsValid] = useState(false);

    const handleHeadingChange = (event) => {
        setCurrentHeading(event.target.value);
        if (event.target.value !== heading) setHeadingChanged(true);
        else setHeadingChanged(false);
    }

    const handleTextChange = (event) => {
        setCurrentText(event.target.value);
        if (event.target.value !== text) setTextChanged(true);
        else setTextChanged(false);
    }

    const handleImageSrcChange = (event) => {
        setCurrentImageSrc(event.target.value);
        if (event.target.value !== imageSrc) setImageSrcChanged(true);
        else setImageSrcChanged(false);
    }

    const handleSave = () => {
        updateContent(index, {
            type: "imageTextBox",
            heading: currentHeading,
            text: currentText,
            imageSrc: currentImageSrc
        });
        setHeadingChanged(false);
        setTextChanged(false);
    }

    // validate image url
    useEffect(() => {
        if (currentImageSrc === "") setIsValid(true);
        else {
            const img = new Image();
            img.src = currentImageSrc;
            img.onload = () => {
                setIsValid(true);
            };
        
            img.onerror = () => {
                setIsValid(false);
            };
        }
    }, [currentImageSrc]);

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
            <Box sx={{ padding: '20px'}}><h2 className="heading-font">{index + 1}. Text & Image</h2></Box>
            <Box sx={{padding: '20px'}}>
                <h2 className="text-font">Heading</h2>
                <TextField onChange={handleHeadingChange} fullWidth multiline minRows={1} maxRows={3} required variant="outlined" defaultValue={heading || ""} sx={{marginBottom: '20px', marginTop: '4px'}} />

                <h2 className="text-font">Text Content</h2>
                <TextField onChange={handleTextChange} fullWidth rows={6} maxRows={6} required multiline variant="outlined" defaultValue={text || ""} sx={{marginTop: '4px', marginBottom: '20px'}} />

                <h2 className="text-font">Image Link</h2>
                <TextField onChange={handleImageSrcChange} fullWidth required multiline variant="outlined" minRows={1} maxRows={2} defaultValue={imageSrc || ""} sx={{marginTop: '4px'}} />

            </Box>
            <Box sx={{padding: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}><Button variant="contained" startIcon={<EditIcon/>} onClick={handleSave} disabled={(!headingChanged && !textChanged && !imageSrcChanged) || !isValid} >EDIT</Button>
            {(!isValid) && <h2 className="error-font" style={{marginLeft: '5px'}}>Invalid Image Link</h2>}
            </Box>
        </Box>
    )
}
