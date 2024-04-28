import { Typography, Box } from "@mui/material"
import './textBox.css'

export default function TextBox(props) {

    return (
        <Box borderRadius={5} p={5} sx={{backgroundColor: '#3CA3EE'}}>
            <Typography className="abeezee-font" sx={{color: 'white'}}>
                {props.text}
            </Typography>
        </Box>
    )
}