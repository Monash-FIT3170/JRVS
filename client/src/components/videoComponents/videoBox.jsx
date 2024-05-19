import { Box } from "@mui/material"

export default function VideoBox(props) {

    return (
        <Box borderRadius={5} p={5} sx={{backgroundColor: '#FFFFFF', width: '50vw', height: '50vh', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <iframe allowFullScreen style={{borderRadius: 5}} width={'100%'} height={'100%'} src={props.url}/>
        </Box>
    )
}