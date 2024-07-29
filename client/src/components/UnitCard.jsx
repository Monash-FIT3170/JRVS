import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';



const UnitCard = ({ title, progress, imageColour, icon }) => {
    return (
        <Card style={{borderRadius: 15}} className="unit-card">
            <React.Fragment>
                <CardContent style={{ padding: 0 }}>
                    <div style={{
                        backgroundColor: imageColour,
                        width: "100%",
                        height: 240,
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex"
                    }}><Icon style={{ fontSize: 160, color: "white" }}>{icon}</Icon>
                    </div>
                </CardContent>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>{title}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" value={progress}/>
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">{`${Math.round(progress,)}%`}</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </React.Fragment>
        </Card>
    )
}

export default UnitCard;