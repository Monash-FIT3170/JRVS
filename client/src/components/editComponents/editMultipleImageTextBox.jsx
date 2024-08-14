import { Box, TextField } from "@mui/material";
import './editComponents.css'


export default function EditMultipleImageTextBox(props) {
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
            <Box sx={{ padding: '20px'}}><h2 className="heading-font">{props.index + 1}. Text + Multiple Images</h2></Box>
            <Box sx={{padding: '20px'}}>
                <h2 className="text-font">Heading</h2>
                <TextField fullWidth required variant="outlined" label="Heading" defaultValue={props.heading ? props.heading : ""} sx={{marginBottom: '20px', marginTop: '8px'}} />

                <h2 className="text-font">Text Content</h2>
                <TextField fullWidth required multiline variant="outlined" label="Text" minRows={5} defaultValue={props.text ? props.text : ""} sx={{marginTop: '8px', marginBottom: '20px'}} />

                <h2 className="text-font">Image Links</h2>
                {props.imageSrcs && props.imageSrcs.map((imageSrc, index) => (
                    <TextField fullWidth required multiline variant="outlined" label={"Image Link " + (index + 1)} minRows={1} defaultValue={imageSrc ? imageSrc : ""} sx={{ marginTop: '10px'}} key={index}/>
                ))}
                
            </Box>

        </Box>
    )
}
