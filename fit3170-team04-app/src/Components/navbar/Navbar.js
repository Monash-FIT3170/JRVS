
//COMPONENTS
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';

//ICONS
import SchoolIcon from '@mui/icons-material/School';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';



export default function Navbar() {
    /*Plan is for when we setup MongoDB, we can retrieve the data (after any filtering and sorting)
    Then we can just put them into a list and map them out. This could be useful for displaying our
    list of courses dynamically rather than hardcoding them. This can also apply for stuff like:
    Displaying the questions for the quiz page for each topic
    eg: we can filter to topic 4, then for each question, we would filter by questionType: then display
    The question accordingly in the ReactApp. THat way we can handle every questionType (multiple choice, True/False, etc)
    */  
    const options = [
        'My Courses',
        'Filler',
        'Filler 2',
        'Filler 3',
    ]

    const icons = [
        <SchoolIcon />,
        <EmojiObjectsOutlinedIcon />,
        <SchoolIcon />,
        <SchoolIcon />,
    ]

    const NavPanel = (
            <Box sx={{ width: 240 }} role="NavPanel">
                <Typography variant="h4" align="center" padding="10px">
                    LOGO HERE
                </Typography>
                <List>
                    <ListItem key={'dashboard'}>
                        <ListItemButton>
                            <ListItemIcon>
                                {<DashboardOutlinedIcon/>}
                            </ListItemIcon>

                            <ListItemText primary={"Dashboard"} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />

                    {options.map((text, index) => (
                        <ListItem key={text}>
                            <ListItemButton>
                                < ListItemIcon>
                                    {icons[index]}
                                </ListItemIcon>
                                <ListItemText secondary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}

                </List>
                {/*IDK HOW ELSE TO SPACE THIS*/}
                <Typography variant="h6" component="div" height={'50%'} >
                </Typography>
                <IconButton
                >
                    <HelpOutlineIcon />
                </IconButton>
            </Box>



        
    );


    return (
        <div>

            <Drawer variant="permanent" anchor="left">
                {NavPanel}
            </Drawer>
        </div>
    );
}