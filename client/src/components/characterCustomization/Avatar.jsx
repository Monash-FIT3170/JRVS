import * as React from "react";
const avatars = require.context('../../assets/images/avatars', false, /\.png$/);
const backgrounds = require.context('../../assets/images/backgrounds', false, /\.png$/);
const borders = require.context('../../assets/images/borders', false, /\.(png|gif)$/);

const path = '../../assets/images/'
export default function Avatar(paths){
    var avatar = avatars('./' + paths['avatarPath']);
    var background = backgrounds('./' + paths['backgroundPath']);
    var border = borders('./' + paths['borderPath']);
    return (
        <div style={{position: 'relative', padding: '0px', marginBottom: '20px',flexGrow: '1', width: '75%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' , backgroundColor: 'white', borderRadius: '20px'}}>
                <div data-name={paths['avatarPath']} id='userAvatar' style={{zIndex: '2', position: 'absolute', bottom: '45%', right: '50%', transform: 'translate(50%, 50%)', height: '70%', width: '70%'}}>
                <img src={avatar} style={{width: '100%'}}></img>
                </div>
                <div data-name={paths['backgroundPath']} id='userBackground' style={{zIndex: '1', position: 'absolute', bottom: '50%', right: '50%', transform: 'translate(50%, 50%)', backgroundColor: 'white', borderRadius: '20px', height: '80%', width: '80%'}}>                
                <img src={background} style={{borderRadius: '15px', width: '100%'}}></img>
                </div>
                <div data-name={paths['borderPath']} id='userBorder' style={{zIndex: '0', position: 'relative', bottom: '0', right: '0', height: '100%', width: '100%', borderRadius: '20px', backgroundColor: 'white'}}>
                <img src={border} style={{borderRadius: '20px', width:'100%'}}></img>
                </div>
            </div>
    );
}