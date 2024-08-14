import { Box, Button, TextField } from "@mui/material";
import './editComponents.css'
import { useState } from "react";


export default function EditTextBox({heading, text, index, updateContent}) {
    
    const [headingChanged, setHeadingChanged] = useState(false);
    const [textChanged, setTextChanged] = useState(false);
    const [currentHeading, setCurrentHeading] = useState(heading);
    const [currentText, setCurrentText] = useState(text);

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

    const handleSave = () => {
        console.log("test");
        updateContent(index, {
            type: "textBox",
            heading: currentHeading,
            text: currentText
        });
        setHeadingChanged(false);
        setTextChanged(false);
    }

    return (
        <Box 
            sx={{
                borderColor: 'black',
                borderWidth: '2px',
                width: '50%',
                borderRadius: '5px',
                marginBottom: '20px'
            }}
        >
            <Box sx={{ padding: '20px'}}><h2 className="heading-font">{index + 1}. Text Only</h2></Box>
            <Box sx={{padding: '20px'}}>
                <h2 className="text-font">Heading</h2>
                <TextField onChange={handleHeadingChange} fullWidth required variant="outlined" label="Heading" defaultValue={heading || ""} sx={{marginBottom: '20px', marginTop: '8px'}} />

                <h2 className="text-font">Text Content</h2>
                <TextField onChange={handleTextChange} fullWidth required multiline variant="outlined" label="Text" minRows={5} defaultValue={text || ""} sx={{marginTop: '8px'}} />

            </Box>
            <Box sx={{padding: '20px'}}><Button variant="contained" onClick={handleSave} disabled={!headingChanged && !textChanged} >SAVE</Button></Box>
        </Box>
    )
}
