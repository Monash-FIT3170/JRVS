import React, { useEffect, useState } from 'react';
import BadgeContainer from '../components/BadgeDisplay';
import Grid from '@mui/material/Unstable_Grid2';
import avatar from '../assets/images/Avatar.png';
import MenuBar from '../components/MenuBar'
import DefaultButton from '../components/DefaultButton';


import '../assets/styles/App.css'

import { useApi } from '../context/ApiProvider';

const ProfilePage = () => {
  const { getData } = useApi();
  const [badges, setBadges] = useState(undefined);
  const [isBadgeLoading, setIsBadgeLoading] = useState(true);
  const [user, setUser] = useState({ username: '', points: 0 });
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const responseData = await getData('api/badges');
        setBadges(responseData);
        setIsBadgeLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUser = async () => {
      try {
        const username = 'testuser'; 
        const userData = await getData(`api/users/${username}`);
        setUser({ username: userData.username, points: userData.points });
        setIsUserLoading(false);
      } catch (error) {
        console.log(error);
        setIsUserLoading(true);
      }
    };
    fetchBadges();
    fetchUser();

  }, [getData])

  return (
    <div className='App-page'>
      <MenuBar />
      <Grid container spacing={2} style={{ padding: '0 30px 0 20px'}}>
        <Grid xs={12} style={{ padding: '0 0 10px 40px' }}>
          <h2 style={{ color: 'white', font: 'Roboto', fontWeight: '700', fontSize: '60px' }}>Welcome User</h2>
        </Grid>
        <Grid xs={4} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{ border: '1px solid black', padding: '20px', marginBottom: '40px', flexGrow: '1', width: '90%', textAlign:'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white'}}>
            <img src={avatar} alt='avatar icon'></img>
            <DefaultButton href='/' text='Customise Avatar' />
            {/* TODO: ADD LINK TO CUSTOMISE PAGE */}
          </div>
          <div style={{ border: '1px solid black', padding: '20px', marginBottom: '40px', flexGrow: '1', width: '90%', textAlign:'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white'}}>
            <h2 className='russo-one-regular text-4xl'>@{user.username}</h2>
            {/* TODO: link username  */}
          </div>
          <div style={{ border: '1px solid black', padding: '20px', marginBottom: '40px', flexGrow: '1', width: '90%', textAlign:'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white'}}>
            <h2 className='russo-one-regular text-4xl'>{user.points} ⭐️</h2>
          </div>
        </Grid>
        <Grid xs={8} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{ border: '1px solid black', padding: '20px', marginBottom: '40px', flexGrow: '1', width: '100%', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white'}}>
            <h2 style={{ font: 'Roboto', fontWeight: '700', fontSize: '40px' }}>My Badges</h2>
            {isBadgeLoading ? <p>Loading...</p> : <BadgeContainer badges={badges}/>}
            {/* Add content for badges */}
          </div>
          {/* <div style={{ border: '2px solid #2196f3', padding: '20px', flexGrow: '2', width: '100%', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 className='russo-one-regular text-4xl'>Units</h2>
          </div> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilePage;

