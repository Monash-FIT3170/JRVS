/**
 * @file ImageSelector.js
 * @description A set of React components for displaying and selecting images in various categories such as avatars, backgrounds, and borders. Includes components for displaying images with overlays indicating selection or lock status.
 * @module ImageSelector
 * @requires @mui/material/Unstable_Grid2
 * @requires ../../assets/images/greenTick.png
 * @requires ../../assets/images/locked.png
 * @requires ../../assets/images/avatars/*.png
 * @requires ../../assets/images/backgrounds/*.png
 * @requires ../../assets/images/borders/*.png
 * 
 * @exports Avatars
 * @exports Borders
 * @exports Backgrounds
 * 
 * @param {Object} props - The component props.
 * @param {Array<string>} props.unlocked - List of names of unlocked items.
 * @param {Function} props.change - Function to call when an item is selected.
 * @param {string} props.current - Name of the currently selected item.
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @example
 * <Avatars 
 *   unlocked={['avatar1.png', 'avatar2.png']} 
 *   change={(selected) => console.log('Selected:', selected)} 
 *   current='avatar1.png' 
 * />
 */


import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Tick from '../../assets/images/greenTick.png';
import Locked from '../../assets/images/locked.png';
const avatarImages = require.context('../../assets/images/avatars', false, /\.png$/);
const backgroundImages = require.context('../../assets/images/backgrounds', false, /\.png$/);
const borderImages = require.context('../../assets/images/borders', false, /\.(png|gif)$/);
export const avatarImageList = avatarImages.keys().map(image => ({
    name: image.slice(2),
    source: avatarImages(image)
  }));
  export const backgroundImageList = backgroundImages.keys().map(image => ({
    name: image.slice(2),
    source: backgroundImages(image)
  }));
  export const borderImageList = borderImages.keys().map(image => ({
    name: image.slice(2),
    source: borderImages(image)
  }));

function Avatar({image}){
  return (<div style={{padding: '20px'}}><img src={image.source} alt={'avatar'} style={{borderRadius: '20px'}} /></div>);
}
function Background({image}){
  return (<div style={{padding: '20px'}}><img src={image.source} alt={'background'} style={{ borderRadius: '20px'}} /></div>);
}
function Border({image}){
  return (
    <div style={{position: 'relative'}}>
      <img  src={image.source} alt={'border'} style={{ borderRadius: '20px'}} />
      <div style={{zIndex: '1', position: 'absolute', bottom: '50%', right: '50%', transform: 'translate(50%, 50%)', backgroundColor: '#80BAE4', borderRadius: '20px', height: '77%', width: '77%'}}/>
    </div>
  );
}

export function Avatars({unlocked, change, current}){
    return <TileCreator unlocked={unlocked} change={change} type='Avatar' Tile={Avatar} imageList={avatarImageList} current={current}/>;
}
export function Borders({unlocked, change, current}){
    return <TileCreator unlocked={unlocked} change={change} type='Border' Tile={Border} imageList={borderImageList} current={current}/>;
}
export function Backgrounds({unlocked, change, current}){
    return <TileCreator unlocked={unlocked} change={change} type='Background' Tile={Background} imageList={backgroundImageList} current={current}/>;
}

//  avatars generated with https://www.canva.com/
//  using images -> concept art
//  using the prompt 'robot _____ avatar headshot, clear background'
//  then background removal tool
function TileCreator({unlocked, type, Tile, imageList, change, current}){
    const defaultImage = imageList[0];
    const currentData = imageList.find(image=>image.name===current);
    const [selected, setSelected] = useState(currentData);

    useEffect(() => {
        change(selected.name);
      }, [selected]);

  return (
    <Grid container spacing={2} columns={25}>
        {(imageList).map((image, index) => (
            <Grid key={type+'Key_'+index} xs={5} style={{padding:'20px'}}>
            <div style={{ border: '2px solid #2196f3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#80BAE4", height: '100%', width: '100%' }} onClick={() => selectTile(image, unlocked, selected, setSelected, defaultImage)}>
                <Tile image={image}/>
                <div style={{width: '100%', position: 'relative'}}>
                    <TileOverlay image={image} selected={selected} unlocked={unlocked}/>
                </div>
            </div>
            
            </Grid>
        ))}
    </Grid>
  );
};

// handles the selection of a new tile
function selectTile(image, unlocked, selected, setSelected, defaultImage){
    // only process unlocked tiles
    if (unlocked.includes(image.name)){
        // if selected again, change back to default
        if(image===selected){
            setSelected(defaultImage);
        } else {
            setSelected(image);
        }
        
    }
}

function TileOverlay({image, selected, unlocked}){
    // shows tick overlay for selected item
    if (image === selected){
        return <img src={Tick} alt={'tick'} style={{border: '2px solid #2196f3', zIndex: '1', padding: '20px', position: 'absolute', bottom: '0', right: '0', width:'100%', backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: '20px'}}/>;
    }
    // shows locked overlay for locked items
    if (!unlocked.includes(image.name)){
        return <img src={Locked} alt={'locked'} style={{border: '2px solid #2196f3', zIndex: '1', position: 'absolute', bottom: '0', right: '0', width:'100%', backgroundColor: 'rgba(0,0,0,0.75)', borderRadius: '20px'}}/>
    }
    return null;
}