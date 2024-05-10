import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Tick from '../../assets/images/greenTick.png';

const images = require.context('../../assets/images/borders', false, /\.(png|gif)$/);
const imageList = images.keys().map(image => images(image));
var selected = '0';

const Borders = () => {
    const handleImageClick = (imageName) => {
        if (imageName==selected){
            imageName = '0';
        }
        document.getElementById('userBorder').innerHTML = `<img src=${imageList[imageName]} style="border-radius: 20px; width: 100%;"></img>`;
        document.getElementById('border_'+selected).innerHTML = ``;
        document.getElementById('border_'+imageName).innerHTML = `<img src=${Tick} style="border: 2px solid #2196f3; z-index: 2; padding: 20px; position: absolute; bottom: 0; right: 0; width: 100%; background-color: rgba(0,0,0,0.5); border-radius: 15px;"/>`;
        selected = imageName;
    };
  return (
    <Grid container spacing={2} columns={25}>
        {Object.keys(imageList).map((imageName, index) => (
            <Grid key={'borderKey_'+index} xs={5} style={{padding: '20px'}}>
            <div style={{border: '5px solid #80BAE4', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#80BAE4" }} onClick={() => handleImageClick(imageName)}>
                <img  src={imageList[imageName]} style={{ borderRadius: '15px'}} />
                <div id={'border_'+imageName} style={{width: '100%', position: 'relative'}}>
                    {imageName == selected ? <img src={Tick} style={{border: '2px solid #2196f3', zIndex: '2', padding: '20px', position: 'absolute', bottom: '0', right: '0', width:'100%', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '15px'}}/> : null}
                </div>
                <div id='userBackground' style={{zIndex: '1', position: 'absolute', bottom: '50%', right: '50%', transform: 'translate(50%, 50%)', backgroundColor: '#80BAE4', borderRadius: '20px', height: '77%', width: '77%'}}>
                </div>
            </div>
            
            </Grid>
        ))}
    </Grid>
  );
};

export default Borders;

//  borders can be png or gif, they just have to be 1:1 aspect ratio