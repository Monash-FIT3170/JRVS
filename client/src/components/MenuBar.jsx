import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { IconButton } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import SchoolIcon from '@mui/icons-material/School';

const MenuBar = () => {
    //TODO: fetch coins here
    const coins = 1000;

    return (
        <Grid container spacing={2} columns={22} style={{paddingTop: '30px', paddingLeft: '60px', paddingRight: '80px', backgroundColor: '#3CA3EE'}}>
            <Grid xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <p className='russo-one-regular text-5xl text-white'>JRVS</p>
            </Grid>
            <Grid xs={15}></Grid>
            <Grid xs={5} style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ padding:'10px', backgroundColor: '#FFC700', borderRadius: '20px' }}>
                    <p className='russo-one-regular text-4xl'>&nbsp;{coins} ⭐️&nbsp;</p>
                </div>
    
                <IconButton href="/lesson" aria-label="school" style={{ color: "white", fontSize: "40px" }}>
                    <SchoolIcon fontSize="inherit" />
                </IconButton>

                <IconButton href="/profile" aria-label="face" style={{ color: "white", fontSize: "40px" }}>
                    <FaceIcon fontSize="inherit" />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default MenuBar;