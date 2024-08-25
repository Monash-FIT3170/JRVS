import React, { useEffect, useState } from 'react';
import BadgeContainer from '../components/BadgeDisplay';
import Grid from '@mui/material/Unstable_Grid2';
import MenuBar from '../components/MenuBar'
import DefaultButton from '../components/DefaultButton';


import '../assets/styles/App.css'

import { useApi } from '../context/ApiProvider';
import Avatar from '../components/characterCustomization/Avatar';

const ProfilePage = () => {
  const {getData, postData } = useApi();
  const [badges, setBadges] = useState(undefined);
  const [isBadgeLoading, setIsBadgeLoading] = useState(true);
  const [user, setUser] = useState({ username: '', points: 0, level: 0 });
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [avatar, setAvatar] = useState({avatar: '_default.png', border: '_default.png', background: '_default.png'})

  useEffect(() => {
    const fetchBadges = async (badgeArray) => {
      try {
        const fetchedBadges = await Promise.all(
          badgeArray.map(async (badge) => {
            const responseData = await getData(`api/badges/id/${badge.id}`);    
            responseData['timeAchieved'] = badge.timeAchieved;
            return responseData;
          })
        );
        setBadges(fetchedBadges);
        setIsBadgeLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await postData('api/auth/current', {token});
        const userData = await getData(`api/users/id/${res.decoded.id}`);
        setUser({ username: userData.username, points: userData.points || 0, level: userData.level || 0 });
        setAvatar({avatar: userData.avatar, border: userData.border, background: userData.background});
        fetchBadges(userData.badges || []);
        setIsUserLoading(false);
      } catch (error) {
        console.log(error);
        setIsUserLoading(true);
      }
    };
    fetchUser();

  }, [getData, postData])

  return (
    <div className='App-page'>
      <MenuBar />
      <Grid container spacing={2} style={{ padding: '0 30px 0 20px'}}>
        <Grid xs={12} style={{ padding: '0 0 10px 40px' }}>
          <h2 style={{ color: 'white', font: 'Roboto', fontWeight: '700', fontSize: '60px' }}>MY PROFILE</h2>
        </Grid>
        <Grid xs={4} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{
            border: '1px solid black',
            padding: '20px',
            marginBottom: '20px',
            flexGrow: '1',
            width: '90%',
            textAlign: 'center',
            borderRadius: '20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white'
          }}>
            <Avatar avatar={avatar.avatar} background={avatar.background} border={avatar.border}/>
            <h2 className='russo-one-regular text-4xl'>@{user.username}</h2>

          </div>
          <div style={{
            border: '1px solid black',
            padding: '20px',
            marginBottom: '20px',
            flexGrow: '1',
            width: '90%',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius: '20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white'
          }}>
            <h2 className='russo-one-regular text-4xl'>{isUserLoading ? 'Loading...' : user.level} ⭐️</h2>
            <DefaultButton href='/leaderboard' text='View Leaderboard'/>

          </div>
          <div style={{
            border: '1px solid black',
            padding: '20px',
            marginBottom: '40px',
            flexGrow: '1',
            width: '90%',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius: '20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white'
          }}>
            <h2 className='russo-one-regular text-4xl'>{isUserLoading ? 'Loading...' : user.points} 💰</h2>
            <DefaultButton href='/customize' text='Customise Avatar'/>

          </div>
        </Grid>
        <Grid xs={8} style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{ border: '1px solid black', padding: '20px', marginBottom: '40px', flexGrow: '1', width: '100%', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white'}}>
            <h2 style={{ font: 'Roboto', fontWeight: '700', fontSize: '40px' }}>My Badges</h2>
            {isBadgeLoading ? <p>Loading...</p> : <BadgeContainer badges={badges}/>}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilePage;

