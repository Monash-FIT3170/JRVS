import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LabTabs from '../components/characterCustomization/CustomizeItemTabs';
import Grid from '@mui/material/Unstable_Grid2';
import { useApi } from '../context/ApiProvider';
import avatar from '../assets/images/Avatar.png';
import DefaultBorder from '../assets/images/borders/_white.png';


const CustomizePage = () => {
  const { getData } = useApi();
  const [data, setData] = useState(undefined);
  const [isBadgeLoading, setIsBadgeLoading] = useState(true);

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
    fetchData();
  }, [getData])

  return (
    
      <div style ={{ backgroundColor: '#3CA3EE', overflowY: 'hidden', overflowX: 'hidden', height: '100vh', display: 'flex', flexDirection: 'column'}} >
        <Grid container spacing={2} columns={22} style={{paddingTop: '40px', paddingLeft: '60px', paddingRight: '80px', marginBottom: '20px'}}>
            <Grid xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <p className='russo-one-regular text-5xl text-white'>JRVS</p>
                </Grid>
                <Grid xs={15} ></Grid>
                <Grid xs={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{padding:'10px', backgroundColor: 'white', borderRadius: '20px'}}>
                    <p className='russo-one-regular text-4xl'>&nbsp;1020🪙&nbsp;</p>
                </div>
                <Link to="/">
                    <p className='russo-one-regular text-5xl'>🎓</p>
                </Link>
                <Link to="/profile">
                    <p className='russo-one-regular text-5xl'>👤</p>
                </Link>
            </Grid>
        </Grid>
        <Grid container spacing={0} columns={24}>
          <Grid xs={8} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{position: 'relative', padding: '0px', marginBottom: '20px',flexGrow: '1', width: '75%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' , backgroundColor: 'white', borderRadius: '20px'}}>
                <div id='userAvatar' style={{zIndex: '2', position: 'absolute', bottom: '45.1%', right: '50%', transform: 'translate(50%, 50%)', height: '70%', width: '70%'}}>
                <img src={avatar}></img>
                </div>
                <div id='userBackground' style={{zIndex: '1', position: 'absolute', bottom: '50%', right: '50%', transform: 'translate(50%, 50%)', backgroundColor: 'white', borderRadius: '20px', height: '80%', width: '80%'}}>                
                </div>
                <div id='userBorder' style={{zIndex: '0', position: 'relative', bottom: '0', right: '0', height: '100%', width: '100%', borderRadius: '20px', backgroundColor: 'white'}}>
                <img src={DefaultBorder} style={{borderRadius: '20px'}}></img>
                </div>
            </div>
            <div style={{ border: '2px solid #2196f3', padding: '20px', marginBottom: '20px', flexGrow: '1', width: '75%', textAlign:'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
              <p className='russo-one-regular text-4xl'>@Username</p>
            </div>
            <div style={{ border: '2px solid #2196f3', padding: '20px', marginBottom: '20px', flexGrow: '1', width: '75%', textAlign:'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
              <p className='russo-one-regular text-4xl'>1020🪙</p>
            </div>
          </Grid>
          <Grid xs={16} style={{paddingRight: '80px', paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{ border: '2px solid #2196f3', marginBottom: '35px', flexGrow: '1', width: '100%', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
              <LabTabs></LabTabs>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={15}>
            <Grid xs={5} ></Grid>
            <Grid xs={2} style={{ padding: '20px', border: '2px solid #2196f3', backgroundColor: '#27CA40', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                <Link to="/profile">
                    <p className='russo-one-regular text-4xl'>Save</p>
                </Link>
            </Grid>
            <Grid xs={1} ></Grid>
            <Grid xs={2} style={{ padding: '20px', border: '2px solid #2196f3', backgroundColor: '#DF4E4E', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                <Link to="/profile">
                    <p className='russo-one-regular text-4xl'>Cancel</p>
                </Link>
            </Grid>
            <Grid xs={5} ></Grid>
        </Grid>
        <Grid container style={{flex: '1'}}></Grid>
      </div>
  );
}

export default CustomizePage;


