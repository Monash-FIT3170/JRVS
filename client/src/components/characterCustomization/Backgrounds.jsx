import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Tick from '../../assets/images/greenTick.png';

const images = require.context('../../assets/images/backgrounds', false, /\.png$/);
const imageList = images.keys().map(image => images(image));
var selected = '0';

function ImageName(index){
    let string = imageList[index];
    let filename = string.split("/").pop();
    let name = filename.split(".")[0];
    let extension = "." + filename.split(".").pop();
    return name + extension;
}

const Backgrounds = () => {
    const handleImageClick = (imageName) => {
        if (imageName==selected){
            imageName = '0';
        }
        let name = ImageName(imageName);
        document.getElementById('userBackground').setAttribute("data-name", name);
        document.getElementById('userBackground').innerHTML = `<img src=${imageList[imageName]} style="border-radius: 15px; width: 100%;"></img>`;
        document.getElementById('background_'+selected).innerHTML = ``;
        document.getElementById('background_'+imageName).innerHTML = `<img src=${Tick} style="border: 2px solid #2196f3; z-index: 1; padding: 20px; position: absolute; bottom: 0; right: 0; width: 100%; background-color: rgba(0,0,0,0.5); border-radius: 15px;"/>`;
        selected = imageName;
    };
  return (
    <Grid container spacing={2} columns={25}>
        {Object.keys(imageList).map((imageName, index) => (
            <Grid key={'backgroundKey_'+index} xs={5} style={{padding: '20px'}}>
            <div style={{padding: '20px', border: '2px solid #2196f3', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#80BAE4", height: '100%', width: '100%' }} onClick={() => handleImageClick(imageName)}>
                <img src={imageList[imageName]} style={{ borderRadius: '15px'}} />
            </div>
            <div id={'background_'+imageName} style={{width: '100%', position: 'relative'}}>
                    {imageName == selected ? <img src={Tick} style={{border: '2px solid #2196f3', zIndex: '1', padding: '20px', position: 'absolute', bottom: '0', right: '0', width:'100%', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '15px'}}/> : null}
            </div>
            
            </Grid>
        ))}
    </Grid>
  );
};

export default Backgrounds;

//  backgrounds generated with https://tensor.art/
//  using the prompt 'cartoon ____ background'