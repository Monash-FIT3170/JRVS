import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

const images = require.context('../assets/images/avatars', false, /\.png$/);
const imageList = images.keys().map(image => images(image));

// Your React component to display images
const Avatars = () => {
    const handleImageClick = (imageName) => {
        document.getElementById('userAvatar').innerHTML = `<img src=${imageList[imageName]}></img>`;
    };
  return (
    <Grid container spacing={2} columns={25}>
        {Object.keys(imageList).map((imageName, index) => (
            <Grid xs={5} >
            <div style={{ padding: '20px', border: '2px solid #2196f3', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: "#80BAE4" }} onClick={() => handleImageClick(imageName)}>
                <img key={index} src={imageList[imageName]} alt={imageName} style={{padding: '20px'}} />
            </div>
            
            </Grid>
        ))}
    </Grid>
  );
};

export default Avatars;