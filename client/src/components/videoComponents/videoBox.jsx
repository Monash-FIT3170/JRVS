/**
 * @file VideoBox.js
 * @description React component that displays a video inside a styled Material-UI Box component. The video is embedded using an iframe, and the box has customizable styling including border radius, padding, and box shadow.
 * @module VideoBox
 * @requires @mui/material/Box
 * @param {Object} props - Component properties.
 * @param {string} props.url - The URL of the video to be displayed in the iframe.
 * @returns {JSX.Element} A styled Material-UI Box containing an embedded video.
 * @example
 * // Example usage of VideoBox
 * <VideoBox url="https://www.youtube.com/embed/dQw4w9WgXcQ" />
 */


import { Box } from "@mui/material"

export default function VideoBox(props) {

    return (
        <Box borderRadius={5} p={5} sx={{backgroundColor: '#FFFFFF', width: '50vw', height: '50vh', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <iframe allowFullScreen style={{borderRadius: 5}} width={'100%'} height={'100%'} src={props.url}/>
        </Box>
    )
}