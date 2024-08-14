import { Box, TextField } from "@mui/material";
import './editComponents.css'


export default function EditImageTextBox(props) {
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
            <Box sx={{ padding: '20px'}}><h2 className="heading-font">{props.index + 1}. Text + Image</h2></Box>
            <Box sx={{padding: '20px'}}>
                <h2 className="text-font">Heading</h2>
                <TextField required variant="outlined" label="Heading" defaultValue={props.heading ? props.heading : ""} sx={{width: '100%', marginBottom: '20px', marginTop: '8px'}} />

                <h2 className="text-font">Text Content</h2>
                <TextField required multiline variant="outlined" label="Text" minRows={1} defaultValue={props.text ? props.text : ""} sx={{width: '100%', marginTop: '8px', marginBottom: '20px'}} />

                <h2 className="text-font">Image Link</h2>
                <TextField required multiline variant="outlined" label="Image Link" minRows={1} defaultValue={props.imageSrc ? props.imageSrc : ""} sx={{width: '100%', marginTop: '8px'}} />

            </Box>

        </Box>
    )
}
