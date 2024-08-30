/**
 * @file MultipleImageTextBox.js
 * @description A React component for displaying a text box with a heading, body text, and a list of images. Utilizes Material-UI components for styling, layout, and responsive image display.
 * @module MultipleImageTextBox
 * @requires @mui/material/Typography
 * @requires @mui/material/Box
 * @requires @mui/material/ImageList
 * @requires @mui/material/ImageListItem
 * @requires React
 * 
 * @param {Object} props - The component props.
 * @param {string} props.heading - The heading text to display above the body content.
 * @param {string} props.text - The body text content to display within the text box.
 * @param {string[]} props.imageSrcs - An array of image source URLs to display within the image list.
 * 
 * @returns {JSX.Element} The rendered MultipleImageTextBox component.
 * 
 * @example
 * <MultipleImageTextBox 
 *   heading="Gallery" 
 *   text="This gallery showcases multiple images related to the topic." 
 *   imageSrcs={["image1.jpg", "image2.jpg", "image3.jpg"]} 
 * />
 */


import { Typography, Box, ImageList, ImageListItem } from "@mui/material"
import './textBox.css'

export default function MultipleImageTextBox(props) {

    return (
        <Box borderRadius={5} p={5} sx={{backgroundColor: '#FFFFFF', width: '100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <h2 className="heading-font">{props.heading}</h2>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant='body' className="text-font" sx={{color: 'black'}}>
                    {props.text}
                </Typography>
                <ImageList 
                    sx={{maxWidth: '50%', maxHeight: '50%', padding: '10px'}}
                    cols={Math.ceil(Math.sqrt(props.imageSrcs.length))}
                >
                    {props.imageSrcs.map((imageSrc) => (
                        <ImageListItem>
                            <img src={imageSrc}></img>
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </Box>
    )
}