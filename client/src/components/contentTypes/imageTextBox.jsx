import { Typography, Box } from "@mui/material"
import './textBox.css'

export default function ImageTextBox(props) {

    return (
        <Box borderRadius={5} p={5} sx={{backgroundColor: '#FFFFFF', width: '100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <h3 className="heading-font">{props.heading}</h3>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant='body' className="text-font" sx={{color: 'black'}}>
                    {props.text}
                </Typography>
                <img src={props.imageSrc} style={{maxWidth: '25%', maxHeight: '75%', padding: '15px'}}></img>
            </Box>
        </Box>
    )
}