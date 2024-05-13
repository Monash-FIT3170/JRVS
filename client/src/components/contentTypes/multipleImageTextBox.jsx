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
                    cols={props.imageSrcs.length}
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