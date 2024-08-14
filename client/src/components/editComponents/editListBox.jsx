import { Box, TextField } from "@mui/material";
import './editComponents.css'


export default function EditListBox(props) {
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
            <Box sx={{ padding: '20px'}}><h2 className="heading-font">{props.index + 1}. List</h2></Box>
            <Box sx={{padding: '20px'}}>
                <h2 className="text-font">Heading</h2>
                <TextField fullWidth required variant="outlined" label="Heading" defaultValue={props.heading ? props.heading : ""} sx={{marginBottom: '20px', marginTop: '8px'}}>

                </TextField>
                <h2 className="text-font">List Items</h2>
                {props.points && props.points.map((point, index) => (<TextField fullWidth required multiline variant="outlined" label={"Point " + (index + 1)} minRows={1} defaultValue={point} sx={{marginTop: '10px'}} key={index}/>))}
            </Box>

        </Box>
    )
}