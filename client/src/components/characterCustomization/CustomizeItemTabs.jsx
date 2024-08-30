/**
 * @file BasicTabs.js
 * @description A React component that provides a tabbed interface for a virtual shop where users 
 * can spend in-game currency to unlock avatars, backgrounds, and borders. 
 * Includes components for displaying loot boxes, handling selections, and integrating with a Spline animation.
 * @module BasicTabs
 * @requires @mui/material/Tabs
 * @requires @mui/material/Tab
 * @requires @mui/material/Typography
 * @requires @mui/material/Box
 * @requires @mui/material/Unstable_Grid2
 * @requires @splinetool/runtime
 * @requires ../../assets/images/box_1.png
 * @requires ../../assets/images/box_2.png
 * @requires ../../assets/images/box_3.png
 * @requires ./TileCreator
 * @requires ../../context/ApiProvider
 * 
 * @param {Object} props - The component props.
 * @param {number} props.coins - The number of in-game currency coins available.
 * @param {Function} props.spendCoins - Function to call when coins are spent.
 * @param {Function} props.setAvatar - Function to update the current avatar.
 * @param {Function} props.setBackground - Function to update the current background.
 * @param {Function} props.setBorder - Function to update the current border.
 * @param {string} props.currentAvatar - The name of the currently selected avatar.
 * @param {string} props.currentBackground - The name of the currently selected background.
 * @param {string} props.currentBorder - The name of the currently selected border.
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @example
 * <BasicTabs 
 *   coins={1500} 
 *   spendCoins={(amount) => console.log('Spent:', amount)} 
 *   setAvatar={(avatar) => console.log('New Avatar:', avatar)} 
 *   setBackground={(background) => console.log('New Background:', background)} 
 *   setBorder={(border) => console.log('New Border:', border)} 
 *   currentAvatar='avatar1.png'
 *   currentBackground='background1.png'
 *   currentBorder='border1.png'
 * />
 */


import React, { useState, useEffect} from 'react';
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import redbox from '../../assets/images/box_1.png';
import silverbox from '../../assets/images/box_2.png';
import goldbox from '../../assets/images/box_3.png';
import { Avatars, Borders, Backgrounds, avatarImageList, borderImageList, backgroundImageList } from "./TileCreator";
import { Application } from '@splinetool/runtime';
import { useApi } from '../../context/ApiProvider';

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

function startOverlay(box_id, image, rarity, new_item){
    var rect = document.getElementById(box_id).getBoundingClientRect();
    document.getElementById('fake_box').innerHTML = `<div id="fake_box_div" style="position: fixed; width: ${rect.width}px; height: ${rect.height}px; top: ${rect.top}px; left: ${rect.left}px; transition: left 1.5s ease;"><img src=${image} style="padding: 30px;"></img></div>`;
    document.getElementById("box_overlay").style.zIndex = "10";
    document.getElementById("box_overlay").style.backgroundColor = 'rgba(60, 163, 238, 1)';
    var common = 'common' === rarity ? 100 : 0;
    var rare = 'rare' === rarity ? 100 : 0;
    var epic = 'epic' === rarity ? 100 : 0;
    var box1 = 'box1' === box_id ? 100 : 0;
    var box2 = 'box2' === box_id ? 100 : 0;
    var box3 = 'box3' === box_id ? 100 : 0;
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
    }, 8500);
    setTimeout(function() {
      document.getElementById('fake_box_div').innerHTML = new_item;
    }, 8800);
    setTimeout(function() {
      document.getElementById("box_overlay").style.backgroundColor = 'rgba(60, 163, 238, 0)';
    }, 11000);
    setTimeout(function() {
      document.getElementById('fake_box').innerHTML = ``;
      document.getElementById("spline_box").style.zIndex = "-1";
      spline.stop();
    }, 11500);
    setTimeout(function() {
      document.getElementById("box_overlay").style.zIndex = "-1";
      document.getElementById("spline_box").removeChild(document.getElementById("spline_box").firstChild);
      reloadSpine();
    }, 13000);
}

export default function BasicTabs({coins, spendCoins, setAvatar, setBackground, setBorder, currentAvatar, currentBackground, currentBorder}) {
  const { getData, postData } = useApi();
  const [value, setValue] = useState(0);
  const [unlockedAvatars, setUnlockAvater] = useState(['_default.png']);
  const [unlockedBorders, setUnlockBorder] = useState(['_default.png']);
  const [unlockedBackgrounds, setUnlockBackground] = useState(['_default.png']);
  const [username, setUsername] = useState('Loading');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await postData('api/auth/current', {token});
        const userData = await getData(`api/users/id/${res.decoded.id}`);
        setUsername(userData.username);
        if(userData.unlockedAvatars.length!==0){
          setUnlockAvater(userData.unlockedAvatars);
          setUnlockBorder(userData.unlockedBorders);
          setUnlockBackground(userData.unlockedBackgrounds);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [])

  useEffect(() => {
    async function saveAvatar() {
      try {
        if (username != 'Loading') {
          await postData('api/users/updateUnlocked', {username, unlockedAvatars, unlockedBorders, unlockedBackgrounds});
        }
      } catch (error) {
        console.log(error);
      }
    };
    saveAvatar();
  }, [unlockedAvatars, unlockedBorders, unlockedBackgrounds])


  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  function clickBox(cost, id, spend, image){
    if (coins>=cost){
      var rarity = 'common';
      var new_item = null;
      var tries = 0;
      while (new_item === null && tries < 10){
        var num = getRandomInt(0,3);
        if (num===0){
          const unlockables = avatarImageList.filter(image => !unlockedAvatars.includes(image.name));
          if (unlockables.length!==0){
            const num2 = getRandomInt(0,unlockables.length);
            new_item = unlockables[num2];
            setUnlockAvater(prev => prev.concat([unlockables[num2].name]));
            new_item = `<img src=${new_item.source} style=" max-width: none; max-height: none; position: absolute; top: 50%; left: 50%; transform: translate(-48%, -50%); width: 300px; border-radius: 20px;"></img>`;
          }
        } else if (num===1){
          const unlockables = borderImageList.filter(image => !unlockedBorders.includes(image.name));
          if (unlockables.length!==0){
            const num2 = getRandomInt(0,unlockables.length);
            rarity = 'rare';
            new_item = unlockables[num2];
            setUnlockBorder(prev => prev.concat([unlockables[num2].name]));
            new_item = `<img src=${new_item.source} style=" max-width: none; max-height: none; position: absolute; top: 50%; left: 50%; transform: translate(-48%, -50%); width: 300px; border-radius: 20px;"></img>
                        <div style=" z-index=15; background-color: rgb(20, 123, 198); max-width: none; max-height: none; position: absolute; top: 50%; left: 50%; transform: translate(-48%, -50%); width: 220px; height: 220px; border-radius: 20px;"/>`;
          };
        } else {
          const unlockables = backgroundImageList.filter(image => !unlockedBackgrounds.includes(image.name));
          if (unlockables.length!==0){
            const num2 = getRandomInt(0,unlockables.length);
            rarity = 'epic';
            new_item = unlockables[num2];
            setUnlockBackground(prev => prev.concat([unlockables[num2].name]));
            new_item = `<img src=${new_item.source} style=" max-width: none; max-height: none; position: absolute; top: 50%; left: 50%; transform: translate(-48%, -50%); width: 300px; border-radius: 20px;"></img>`;
          }
        }
        tries++;
      }
      if (tries !== 10){
        startOverlay(id, image, rarity, new_item);
        spend(cost);
      }
      
    }
  }
  function LootBox({id, name, image, cost}){
    return (
      <Grid xs={5} style={{ padding: '20px', border: '2px solid #2196f3', backgroundColor: "#80BAE4", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}} onClick={()=>clickBox(cost, id, spendCoins, image)}>
          <p className={coins >= cost ?'russo-one-regular text-3xl text-white':'russo-one-regular text-3xl text-red-500'}>{name}</p>
          <img id={id} src={image} alt={name} style={{padding: '30px'}}/>
          <p className={coins >= cost ?'russo-one-regular text-4xl text-white':'russo-one-regular text-4xl text-red-500'}>{cost}🪙</p>
      </Grid>
    );
  }
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
      <Grid container spacing={2} columns={21} style={{marginTop: '60px'}}>
        <Grid xs={1} ></Grid>
            <LootBox id='box1' name='Red Box' image={redbox} cost={100}/>
            <Grid xs={2} ></Grid>
            <LootBox id='box2' name='Silver Box' image={silverbox} cost={500}/>
            <Grid xs={2} ></Grid>
            <LootBox id='box3' name='Golden Box' image={goldbox} cost={2000}/>
            <Grid xs={1} ></Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} style={{height: '60vh', overflowY:'scroll', overflow: 'auto'}}>
          <Avatars unlocked={unlockedAvatars} change={setAvatar} current={currentAvatar}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} style={{height: '60vh', overflowY:'scroll', overflow: 'auto'}}>
          <Backgrounds unlocked={unlockedBackgrounds} change={setBackground} current={currentBackground}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3} style={{height: '60vh', overflowY:'scroll', overflow: 'auto'}}>
          <Borders unlocked={unlockedBorders} change={setBorder} current={currentBorder}/>
      </CustomTabPanel>
    </Box>
  );
}

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
