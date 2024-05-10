import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

const images = require.context('../assets/images/borders', false, /\.(png|gif)$/);
const imageList = images.keys().map(image => images(image));

// Your React component to display images
const Borders = () => {
    const handleImageClick = (imageName) => {
        document.getElementById('userBorder').innerHTML = `<img src=${imageList[imageName]} style="border-radius: 20px; width: 100%;"></img>`;
    };
  return (
    <Grid container spacing={2} columns={25}>
        {Object.keys(imageList).map((imageName, index) => (
            <Grid xs={5} style={{padding: '20px'}}>
            <div style={{border: '5px solid #80BAE4', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#80BAE4" }} onClick={() => handleImageClick(imageName)}>
                <img key={index} src={imageList[imageName]} style={{ borderRadius: '15px'}} />
                <div id='userBackground' style={{zIndex: '1', position: 'absolute', bottom: '50%', right: '50%', transform: 'translate(50%, 50%)', backgroundColor: '#80BAE4', borderRadius: '20px', height: '77%', width: '77%'}}>
                
                </div>
            </div>
            
            </Grid>
        ))}
    </Grid>
  );
};

export default Borders;