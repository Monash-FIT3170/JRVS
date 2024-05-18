import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { IconButton } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import SchoolIcon from '@mui/icons-material/School';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';

const MenuBar = ({coins, title, subtitle}) => {
    title = title ? title : "";
    subtitle = subtitle ? subtitle : "";

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        window.location.href = "/profile";
    };

    const handleLogout = () => {
        setAnchorEl(null);
        localStorage.removeItem('token');
        window.location.href = "/login";
    }

    return (
        <Grid container spacing={2} columns={22} style={{ padding: '30px 30px 20px 60px', backgroundColor: '#3CA3EE'}}>
            <Grid xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <p className='russo-one-regular text-5xl text-white'>JRVS</p>
            </Grid>
            <Grid xs={15}></Grid>
            <Grid xs={5} style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ padding:'10px', backgroundColor: '#FFC700', borderRadius: '20px' }}>
                    <p className='russo-one-regular text-4xl'>&nbsp;{coins} ⭐️&nbsp;</p>
                </div>
    
                <IconButton href="/" aria-label="school" style={{ color: "white", fontSize: "40px" }}>
                    <SchoolIcon fontSize="inherit" />
                </IconButton>
                <React.Fragment>
                    <IconButton onClick={handleClick} aria-label="face" style={{ color: "white", fontSize: "40px" }}>
                        <FaceIcon fontSize="inherit" />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                            My Profile
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </React.Fragment>
                
            </Grid>

            <Grid xs={1}></Grid>
            <Grid xs={20}>
                <Grid xs={22}>
                <p style={{ textAlign: 'center', font: 'Roboto', fontSize: '50px' ,fontWeight: '700', color: 'white' }}>
                    {title}
                </p>
                </Grid>
                <Grid xs={22}>
                <p style={{ textAlign: 'center', font: 'Roboto', fontSize: '30px' ,fontWeight: '400', color: 'white' }}>
                    {subtitle}
                </p>
                </Grid>
            </Grid>
            <Grid xs={1}></Grid>
        </Grid>        
    )
}

export default MenuBar;