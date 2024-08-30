/**
 * @file ImageTextBox.js
 * @description A React component that displays a text box with a heading, a paragraph of text, and an accompanying image. Utilizes Material-UI for styling and layout.
 * @module ImageTextBox
 * @requires @mui/material/Typography
 * @requires @mui/material/Box
 * @requires React
 * 
 * @param {Object} props - The component props.
 * @param {string} props.heading - The heading text to display above the content.
 * @param {string} props.text - The body text content to display alongside the image.
 * @param {string} props.imageSrc - The source URL of the image to display next to the text.
 * 
 * @returns {JSX.Element} The rendered ImageTextBox component.
 * 
 * @example
 * <ImageTextBox 
 *   heading="About Us" 
 *   text="We are a company dedicated to providing excellent service." 
 *   imageSrc="https://example.com/image.jpg" 
 * />
 */


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