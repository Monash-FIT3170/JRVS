import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BadgeContainer from '../components/BadgeDisplay';
import LabTabs from '../components/CustomizeItemTabs';
import Grid from '@mui/material/Unstable_Grid2';
import avatar from '../assets/images/Avatar.png';

import { useApi } from '../context/ApiProvider';

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
    
      <div style ={{ backgroundColor: '#3CA3EE', overflowY: 'hidden', overflowY: 'hidden', overflowX: 'hidden', height: '100vh', display: 'flex', flexDirection: 'column'}} >
        <Grid container spacing={2} columns={22} style={{paddingTop: '40px', paddingLeft: '60px', paddingRight: '80px', marginBottom: '20px'}}>
            <Grid xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <h2 className='russo-one-regular text-5xl text-white'>JRVS</h2>
                </Grid>
                <Grid xs={15} ></Grid>
                <Grid xs={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{padding:'10px', backgroundColor: 'white', borderRadius: '20px'}}>
                    <h2 className='russo-one-regular text-4xl'>&nbsp;1020🪙&nbsp;</h2>
                </div>
                <Link to="/">
                    <h2 className='russo-one-regular text-5xl'>🎓</h2>
                </Link>
                <Link to="/profile">
                    <h2 className='russo-one-regular text-5xl'>👤</h2>
                </Link>
            </Grid>
        </Grid>
        <Grid container spacing={0} columns={24}>
          <Grid xs={8} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{padding: '20px', marginBottom: '40px',flexGrow: '1', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' , backgroundColor: 'white', borderRadius: '20px'}}>
              <img src={avatar} alt='avatar icon'></img>
            </div>
            <div style={{ border: '2px solid #2196f3', padding: '20px', marginBottom: '40px', flexGrow: '1', width: '80%', textAlign:'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
              <h2 className='russo-one-regular text-4xl'>@Username</h2>
            </div>
            <div style={{ border: '2px solid #2196f3', padding: '20px', marginBottom: '40px', flexGrow: '1', width: '80%', textAlign:'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
              <h2 className='russo-one-regular text-4xl'>1020🪙</h2>
            </div>
          </Grid>
          <Grid xs={16} style={{paddingRight: '80px', paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{ border: '2px solid #2196f3', padding: '20px', marginBottom: '40px', flexGrow: '1', width: '100%', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
              <LabTabs></LabTabs>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={15}>
            <Grid xs={5} ></Grid>
            <Grid xs={2} style={{ padding: '20px', border: '2px solid #2196f3', backgroundColor: '#27CA40', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                <Link to="/profile">
                    <h2 className='russo-one-regular text-4xl'>Save</h2>
                </Link>
            </Grid>
            <Grid xs={1} ></Grid>
            <Grid xs={2} style={{ padding: '20px', border: '2px solid #2196f3', backgroundColor: '#DF4E4E', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
                <Link to="/profile">
                    <h2 className='russo-one-regular text-4xl'>Cancel</h2>
                </Link>
            </Grid>
            <Grid xs={5} ></Grid>
        </Grid>
        <Grid container style={{flex: '1'}}></Grid>
      </div>
  );
}

export default CustomizePage;

