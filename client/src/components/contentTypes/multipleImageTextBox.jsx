import { Typography, Box } from "@mui/material"
import './textBox.css'

export default function multipleImageTextBox(props) {

    return (
        <Box borderRadius={5} p={5} sx={{backgroundColor: '#FFFFFF', width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <h2 className="heading-font">{props.heading}</h2>
            <Typography variant='body' className="text-font" sx={{color: 'black'}}>
                {props.text}
            </Typography>
            <img src={props.imageSrc} style={{maxWidth: '75%', maxHeight: '75%', padding: '15px'}}></img>
        </Box>
    )
}