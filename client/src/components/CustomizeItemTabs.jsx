import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import box from '../assets/images/box.png';
import avatar from '../assets/images/Avatar.png';
import Avatars from "./Avatars";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 2, borderColor: "divider"}}>
        <Tabs
          value={value}
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          onChange={handleChange}
          sx={{
            "& button": {border: '0px solid white', color: 'white', flex: '1', backgroundColor: "#3CA3EE", fontSize: '1.4rem', fontWeight: 'normal',fontFamily: 'Russo One', paddingTop: '25px', paddingBottom: '25px'},
            "& button:hover": { backgroundColor: "#80BAE4" },
            "& button.Mui-selected": { backgroundColor: "white" },
          }}
        >
          <Tab style={{borderTopLeftRadius: 15,}} label="Shop" {...a11yProps(0)} />
          <Tab label="Avatars" {...a11yProps(1)} />
          <Tab label="Accessories" {...a11yProps(2)} />
          <Tab label="Backgrounds" {...a11yProps(3)} />
          <Tab style={{borderTopRightRadius: 15}} label="Borders" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} style={{display: 'flex', flex: '1', alignItems: 'center', justifyContent: 'center'}}>
      <Grid container spacing={2} columns={19} style={{marginTop: '60px'}}>
        <Grid xs={1} ></Grid>
            <Grid xs={5} style={{ padding: '20px', border: '2px solid #2196f3', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                    <h2 className='russo-one-regular text-3xl'>Item Box</h2>
                    <img src={box} alt='avatar icon' style={{padding: '40px'}}></img>
                    <h2 className='russo-one-regular text-4xl'>100🪙</h2>
            </Grid>
            <Grid xs={1} ></Grid>
            <Grid xs={5} style={{ padding: '20px', border: '2px solid #2196f3', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                    <h2 className='russo-one-regular text-3xl'>Lucky Box</h2>
                    <img src={box} alt='avatar icon' style={{padding: '30px'}}></img>
                    <h2 className='russo-one-regular text-4xl'>500🪙</h2>
            </Grid>
            <Grid xs={1} ></Grid>
            <Grid xs={5} style={{ padding: '20px', border: '2px solid #2196f3', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                    <h2 className='russo-one-regular text-3xl'>Mystery Box</h2>
                    <img src={box} alt='avatar icon' style={{padding: '20px'}}></img>
                    <h2 className='russo-one-regular text-4xl text-red-500'>2000🪙</h2>
            </Grid>
            <Grid xs={1} ></Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} style={{height: '60vh', overflowY:'scroll', overflow: 'auto'}}>
        <Grid container spacing={2} columns={25}>
            <Avatars></Avatars>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        accessories go here
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        backgrounds go here
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        borders go here
      </CustomTabPanel>
    </Box>
  );
}
