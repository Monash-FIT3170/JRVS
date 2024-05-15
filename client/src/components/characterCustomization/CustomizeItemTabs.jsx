import * as React from "react";
import { useRef } from 'react';
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import box from '../../assets/images/box_test.png';
import redbox from '../../assets/images/box_1.png';
import silverbox from '../../assets/images/box_2.png';
import goldbox from '../../assets/images/box_3.png';
import Avatars from "./Avatars";
import Backgrounds from "./Backgrounds";
import Borders from "./Borders";
import { Application } from '@splinetool/runtime';
import bg from '../../assets/images/backgrounds/city.png'

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
          <Typography component={'span'}>{children}</Typography>
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

var canvas = document.createElement("canvas");
var spline = null;
reloadSpine();

function reloadSpine(){

  spline = new Application(canvas);
  spline
    .load('https://prod.spline.design/arRT0vRiIJOv-x28/scene.splinecode')
    .then(() => {
      spline.stop();
    });
}

function startOverlay(box_id){
    var new_box = ('box1' == box_id ? redbox : ('box2' == box_id ? silverbox : goldbox));
    console.log(new_box);
    var rect = document.getElementById(box_id).getBoundingClientRect();
    document.getElementById('fake_box').innerHTML = `<div id="fake_box_div" style="position: fixed; width: ${rect.width}px; height: ${rect.height}px; top: ${rect.top}px; left: ${rect.left}px; transition: left 1.5s ease;"><img src=${new_box} style="padding: 30px;"></img></div>`;
    document.getElementById("box_overlay").style.zIndex = "10";
    document.getElementById("box_overlay").style.backgroundColor = 'rgba(60, 163, 238, 1)';
    var common = 'box1' == box_id ? 100 : 0;
    var rare = 'box2' == box_id ? 100 : 0;
    var epic = 'box3' == box_id ? 100 : 0;
    var box1 = 'box1' == box_id ? 100 : 0;
    var box2 = 'box2' == box_id ? 100 : 0;
    var box3 = 'box3' == box_id ? 100 : 0;
    spline.setVariables({Common: common, Rare: rare, Epic: epic, box1: box1, box2: box2, box3: box3});
    setTimeout(function() {
      document.getElementById('fake_box_div').style.left = `calc(50% - ${rect.width/2}px)`;
    }, 1500);
    setTimeout(function() {
      document.getElementById("spline_box").style.zIndex = "12";
      document.getElementById("spline_box").appendChild(canvas);
      spline.play();
      spline.setVariables({Common: common, Rare: rare, Epic: epic, box1: box1, box2: box2, box3: box3});
      document.getElementById('fake_box_div').innerHTML = ``;
    }, 3500);
    setTimeout(function() {
      spline.setVariables({Common: 0, Rare: 0, Epic: 0})
    }, 7500);
    setTimeout(function() {
      document.getElementById('fake_box_div').innerHTML = `<img src=${bg} style=" max-width: none; max-height: none; position: absolute; top: 50%; left: 50%; transform: translate(-48%, -50%); width: 300px; border-radius: 20px;"></img>`;
    }, 7800);
    setTimeout(function() {
      document.getElementById("box_overlay").style.backgroundColor = 'rgba(60, 163, 238, 0)';
    }, 10000);
    setTimeout(function() {
      document.getElementById('fake_box').innerHTML = ``;
      document.getElementById("spline_box").style.zIndex = "-1";
      spline.stop();
    }, 10500);
    setTimeout(function() {
      document.getElementById("box_overlay").style.zIndex = "-1";
      document.getElementById("spline_box").removeChild(document.getElementById("spline_box").firstChild);
      reloadSpine();
    }, 12000);
}

export default function BasicTabs() {
  //TODO fetch coins here
  const coins = 1020;
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
          <Tab label="Backgrounds" {...a11yProps(2)} />
          <Tab style={{borderTopRightRadius: 15}} label="Borders" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} style={{display: 'flex', flex: '1', alignItems: 'center', justifyContent: 'center'}}>
      <Grid container spacing={2} columns={19} style={{marginTop: '60px'}}>
        <Grid xs={1} ></Grid>
            <Grid xs={5} style={{ padding: '20px', border: '2px solid #2196f3', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}} onClick={() => startOverlay('box1')}>
                    <p className='russo-one-regular text-3xl'>Red Box</p>
                    <img id='box1' src={redbox} style={{padding: '30px'}}></img>
                    <p className={coins >= 100 ?'russo-one-regular text-4xl':'russo-one-regular text-4xl text-red-500'}>100🪙</p>
            </Grid>
            <Grid xs={1} ></Grid>
            <Grid xs={5} style={{ padding: '20px', border: '2px solid #2196f3', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}} onClick={() => startOverlay('box2')}>
                    <p className='russo-one-regular text-3xl'>Silver Box</p>
                    <img id='box2' src={silverbox} style={{padding: '30px'}}></img>
                    <p className={coins >= 500 ?'russo-one-regular text-4xl':'russo-one-regular text-4xl text-red-500'}>500🪙</p>
            </Grid>
            <Grid xs={1} ></Grid>
            <Grid xs={5} style={{ padding: '20px', border: '2px solid #2196f3', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}} onClick={() => startOverlay('box3')}>
                    <p className='russo-one-regular text-3xl'>Golden Box</p>
                    <img id='box3' src={goldbox} style={{padding: '30px'}}></img>
                    <p className={coins >= 2000 ?'russo-one-regular text-4xl':'russo-one-regular text-4xl text-red-500'}>2000🪙</p>
            </Grid>
            <Grid xs={1} ></Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} style={{height: '60vh', overflowY:'scroll', overflow: 'auto'}}>
        <Grid container spacing={1} columns={25}>
            <Avatars></Avatars>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} style={{height: '60vh', overflowY:'scroll', overflow: 'auto'}}>
        <Backgrounds></Backgrounds>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3} style={{height: '60vh', overflowY:'scroll', overflow: 'auto'}}>
        <Borders></Borders>
      </CustomTabPanel>
    </Box>
  );
}
