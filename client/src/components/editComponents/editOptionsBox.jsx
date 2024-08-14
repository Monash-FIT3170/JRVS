import { Box, Button } from "@mui/material";



export default function EditOptionsBox({deleteContent, moveUp, moveDown, index}) {
    return (
        <Box sx={{
            marginLeft: '10px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Button onClick={() => deleteContent(index)} variant="outlined" sx={{marginBottom: '10px', color: 'black', borderColor: 'black', borderWidth: '2px', borderRadius: '5px'}}>DELETE</Button>
            <Button onClick={() => moveUp(index)} variant="outlined" sx={{marginBottom: '10px', color: 'black', borderColor: 'black', borderWidth: '2px', borderRadius: '5px'}}>MOVE UP</Button>
            <Button onClick={() => moveDown(index)} variant="outlined" sx={{marginBottom: '10px', color: 'black', borderColor: 'black', borderWidth: '2px', borderRadius: '5px'}}>MOVE DOWN</Button>
        </Box>
    )
}