import { Typography, Box } from "@mui/material"
import './textBox.css'

export default function ListBox(props) {

    return (
        <Box borderRadius={5} p={5} sx={{backgroundColor: '#FFFFFF', width: '100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <h3 className="heading-font">{props.heading}</h3>
            <ul className="text-font" style={{listStyleType: 'disc'}}>
                {props.points.map((point, index) => (<li key={index}>{point}</li>))}
            </ul>
        </Box>
    )
}