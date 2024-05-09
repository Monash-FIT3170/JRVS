import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';


import { useApi } from '../context/ApiProvider';
import UnitCard from '../components/UnitCard';

const UnitsPage = () => {
  // const { getData } = useApi();
  // const [data, setData] = useState(undefined);
  // const [isBadgeLoading, setIsBadgeLoading] = useState(true);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const responseData = await getData('api/badges');
  //         setData(responseData);
  //         setIsBadgeLoading(false);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchData();
  //   }, [getData])

  return (
    // Top NavBar
    //imageColour="#66CC66"
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      <Grid container spacing={3} padding={10}>
        <Grid item xs={3}>
          <UnitCard title="Introduction to AI" progress={70} imageColour="#66CC66" icon="code"></UnitCard>
        </Grid>
        <Grid item xs={3}>
          <UnitCard title="Recognising AI" progress={20} imageColour="#A366FF" icon="search"></UnitCard>
        </Grid>
        <Grid item xs={3}>
          <UnitCard title="Understanding Intelligence" progress={50} imageColour="#FFC93C" icon="tips_and_updates"></UnitCard>
        </Grid>
        <Grid item xs={3}>
          <UnitCard title="Types of AI" progress={100} imageColour="#4885FF" icon="memory"></UnitCard>
        </Grid>
      </Grid>
    </div>
  );
}

export default UnitsPage;

