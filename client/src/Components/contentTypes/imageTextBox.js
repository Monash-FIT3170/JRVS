import { Typography, Box } from "@mui/material"
import './textBox.css'

export default function ImageTextBox(props) {

    return (
        <Box borderRadius={5} p={5} sx={{backgroundColor: '#3CA3EE', width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <img src={props.imageSrc} style={{maxWidth: '75%', maxHeight: '75%', padding: '15px'}}></img>
            <Typography variant='body' className="abeezee-font" sx={{color: 'white'}}>
                {props.text}
            </Typography>
        </Box>
    )
}