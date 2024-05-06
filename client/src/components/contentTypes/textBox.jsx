import { Typography, Box } from "@mui/material"
import './textBox.css'

export default function TextBox(props) {

    return (
        <Box borderRadius={5} p={5} sx={{backgroundColor: '#3CA3EE', width: '600px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <Typography variant='body' className="abeezee-font" sx={{color: 'white'}}>
                {props.text}
            </Typography>
        </Box>
    )
}