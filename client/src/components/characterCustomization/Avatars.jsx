import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Tick from '../../assets/images/greenTick.png';

const images = require.context('../../assets/images/avatars', false, /\.png$/);
const imageList = images.keys().map(image => images(image));

//console.log(imageList.indexOf(images('./_default.png')));

function ImageName(index){
    let string = imageList[index];
    let filename = string.split("/").pop();
    let name = filename.split(".")[0];
    let extension = "." + filename.split(".").pop();
    return name + extension;
}

var selected = '0';
const Avatars = () => {
    const handleImageClick = (imageName) => {
        if (imageName===selected){
            imageName = '0';
        }
        let name = ImageName(imageName);
        document.getElementById('userAvatar').setAttribute("data-name", name);
        document.getElementById('userAvatar').innerHTML = `<img src=${imageList[imageName]} style="width: 100%;"></img>`;
        document.getElementById('avatar_'+selected).innerHTML = ``;
        document.getElementById('avatar_'+imageName).innerHTML = `<img src=${Tick} style="border: 2px solid #2196f3; z-index: 1; padding: 20px; position: absolute; bottom: 0; right: 0; width: 100%; background-color: rgba(0,0,0,0.5); border-radius: 20px;"/>`;
        selected = imageName;
    };
  return (
    <Grid container spacing={2} columns={25}>
        {Object.keys(imageList).map((imageName, index) => (
            <Grid key={'avatarKey_'+index} xs={5} style={{padding:'20px'}}>
            <div style={{ border: '2px solid #2196f3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#80BAE4", height: '100%', width: '100%' }} onClick={() => handleImageClick(imageName)}>
                <img src={imageList[imageName]} alt={imageName} style={{padding: '20px'}} />
                <div id={'avatar_'+imageName} style={{width: '100%', position: 'relative'}}>
                    {imageName === selected ? <img src={Tick} alt={'tick'} style={{border: '2px solid #2196f3', zIndex: '1', padding: '20px', position: 'absolute', bottom: '0', right: '0', width:'100%', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '20px'}}/> : null}
                </div>
            </div>
            
            </Grid>
        ))}
    </Grid>
  );
};

export default Avatars;

//  avatars generated with https://www.canva.com/
//  using images -> concept art
//  using the prompt 'robot _____ avatar headshot, clear background'
//  then background removal tool