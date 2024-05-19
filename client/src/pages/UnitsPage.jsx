import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom'



import { useApi } from '../context/ApiProvider';
import UnitCard from '../components/UnitCard';
import MenuBar from '../components/MenuBar';

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

  const navigate = useNavigate()

  const routeChange = () => {
    // let path = "/lessonPath";
    let path = "/learningPath"
    navigate(path);
  } 

  return (
    
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      <MenuBar title="Unit Overview" subtitle="Get ready to learn more about AI today"></MenuBar>
      <Grid container rowSpacing={6} columnSpacing={5} padding={10} backgroundColor='white'>
        <Grid item xs={6} sm={6} md={4} lg={3} onClick={routeChange}>
          <UnitCard title="Introduction to AI" progress={70} imageColour="#66CC66" icon="code"></UnitCard>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} onClick={routeChange}>
          <UnitCard title="Recognising AI" progress={0} imageColour="#A366FF" icon="search"></UnitCard>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} onClick={routeChange}>
          <UnitCard title="Understanding Intelligence" progress={50} imageColour="#FFC93C" icon="tips_and_updates"></UnitCard>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} onClick={routeChange}>
          <UnitCard title="Types of AI" progress={100} imageColour="#4885FF" icon="memory"></UnitCard>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} onClick={routeChange}>
          <UnitCard title="Ethical Issues in AI" progress={100} imageColour="#ff9966" icon="balance"></UnitCard>
        </Grid>
      </Grid>
    </div>
  );
}

export default UnitsPage;

