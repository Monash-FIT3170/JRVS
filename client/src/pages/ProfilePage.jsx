import React, { useEffect, useState } from 'react';
import BadgeContainer from '../components/BadgeDisplay';
import Grid from '@mui/material/Unstable_Grid2';
import avatar from '../assets/images/Avatar.png';
import MenuBar from '../components/MenuBar';
import { Button } from "@mui/material";
import { useApi } from '../context/ApiProvider';
import Avatar from '../components/characterCustomization/Avatar';

const ProfilePage = () => {
  const { getData, postData } = useApi();
  const [data, setData] = useState(undefined);
  const [isBadgeLoading, setIsBadgeLoading] = useState(true);
  const [user, setUser] = useState({ username: '', points: 0 });
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [avatar, setAvatar] = useState({avatar: '_default.png', border: '_default.png', background: '_default.png'})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getData('api/badges');
        setData(responseData);
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
        console.log(userData);
        setUser({ username: userData.username, points: userData.points || 0 });
        setAvatar({avatar: userData.avatar, border: userData.border, background: userData.background})
        setIsUserLoading(false);
      } catch (error) {
        console.log(error);
        setIsUserLoading(true);
      }
    };
    fetchData();
    fetchUser();

  }, [getData])
  return (
    <div>
      <MenuBar coins={user.points} title={'Welcome User'}/>
      <div className='ml-48 ' >
        <Grid container spacing={2}>
          {/* <Grid xs={12} style={{ padding: '40px'}}>
            <h2 className='russo-one-regular text-6xl'>Welcome User</h2>
          </Grid> */}
          <Grid xs={4} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* <div style={{marginBottom: '20px', flexGrow: '1', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <img src={avatar} alt='avatar icon'></img>
            </div> */}
            <Avatar avatar={avatar.avatar} background={avatar.background} border={avatar.border}/>
            <Button href="/customize">
            <div style={{ border: '2px solid #2196f3', padding: '20px', marginBottom: '40px', flexGrow: '1', width: '60%', textAlign:'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' , backgroundColor: '#3CA3EE'}}>
              <h2 href="/customize" className='russo-one-regular text-3xl'>customize avatar</h2>
            </div>
            </Button>
            <div style={{ border: '2px solid #2196f3', padding: '20px', marginBottom: '40px', flexGrow: '1', width: '75%', textAlign:'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <h2 className='russo-one-regular text-4xl'>{'@'+user.username}</h2>
            </div>
            <div style={{ border: '2px solid #2196f3', padding: '20px', marginBottom: '40px', flexGrow: '1', width: '75%', textAlign:'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <h2 className='russo-one-regular text-4xl'>{isUserLoading ? 'Loading...' : user.points}</h2>
            </div>
            
          </Grid>
          <Grid xs={8} style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{ border: '2px solid #2196f3', padding: '20px', marginBottom: '40px', flexGrow: '1', width: '100%', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <h2 className='russo-one-regular text-4xl'>My Badges</h2>
              {isBadgeLoading ? <p>Loading...</p> : <BadgeContainer badges={data}/>}
              {/* Add content for badges */}
            </div>
            <div style={{ border: '2px solid #2196f3', padding: '20px', flexGrow: '2', width: '100%', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <h2 className='russo-one-regular text-4xl'>Units</h2>
              {/* Add content for units */}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ProfilePage;

