/**
 * @file Avatar.js
 * @description A React component that displays a user avatar with a background and border. The avatar, background, and border are sourced from image files imported using Webpack's `require.context`.
 * @module Avatar
 * @requires React
 * @requires ../../assets/images/avatars (all .png files)
 * @requires ../../assets/images/backgrounds (all .png files)
 * @requires ../../assets/images/borders (all .png and .gif files)
 * 
 * @param {Object} props - The component props.
 * @param {string} props.avatar - The filename of the avatar image.
 * @param {string} props.background - The filename of the background image.
 * @param {string} props.border - The filename of the border image.
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @example
 * <Avatar 
 *   avatar="avatar1.png" 
 *   background="background1.png" 
 *   border="border1.png" 
 * />
 */


import * as React from "react";
const avatars = require.context('../../assets/images/avatars', false, /\.png$/);
const backgrounds = require.context('../../assets/images/backgrounds', false, /\.png$/);
const borders = require.context('../../assets/images/borders', false, /\.(png|gif)$/);

export default function Avatar({avatar, background, border}){
    const avatarPath = avatars('./' + avatar);
    const backgroundPath = backgrounds('./' + background);
    const borderPath = borders('./' + border);
    return (
        <div style={{position: 'relative', flexGrow: '1', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' , backgroundColor: 'white', borderRadius: '20px'}}>
                <div data-name={avatar} id='userAvatar' style={{zIndex: '2', position: 'absolute', bottom: '45%', right: '50%', transform: 'translate(50%, 50%)', height: '70%', width: '70%'}}>
                <img src={avatarPath} alt={'avatar'} style={{width: '100%'}}></img>
                </div>
                <div data-name={background} id='userBackground' style={{zIndex: '1', position: 'absolute', bottom: '50%', right: '50%', transform: 'translate(50%, 50%)', backgroundColor: 'white', borderRadius: '20px', height: '80%', width: '80%'}}>                
                <img src={backgroundPath} alt={'avatar background'} style={{borderRadius: '15px', width: '100%'}}></img>
                </div>
                <div data-name={border} id='userBorder' style={{zIndex: '0', position: 'relative', bottom: '0', right: '0', height: '100%', width: '100%', borderRadius: '20px', backgroundColor: 'white'}}>
                <img src={borderPath} alt={'avatar border'} style={{borderRadius: '20px', width:'100%'}}></img>
                </div>
            </div>
    );
}