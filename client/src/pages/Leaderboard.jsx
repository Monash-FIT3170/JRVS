import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import MenuBar from '../components/MenuBar';
import '../assets/styles/App.css'; 

const dummyData = {
  weekly: [
    { rank: 1, username: 'User1', points: 1500 },
    { rank: 2, username: 'User2', points: 1400 },
    { rank: 3, username: 'User3', points: 1300 },
  ],
  monthly: [
    { rank: 1, username: 'User4', points: 1200 },
    { rank: 2, username: 'User5', points: 1100 },
    { rank: 3, username: 'User6', points: 1000 },
    { rank: 4, username: 'User10', points: 900 },
    { rank: 5, username: 'User11', points: 800 },
    { rank: 6, username: 'User12', points: 700 },
    { rank: 7, username: 'User13', points: 600 },
    { rank: 8, username: 'User14', points: 500 },
    { rank: 9, username: 'User15', points: 400 },
    { rank: 10, username: 'User16', points: 300 },
    { rank: 11, username: 'User17', points: 200 },
    { rank: 12, username: 'User18', points: 100 },
  ],
  yearly: [
    { rank: 1, username: 'User7', points: 900 },
    { rank: 2, username: 'User8', points: 800 },
    { rank: 3, username: 'User9', points: 700 },
  ]
};

const LeaderboardPage = () => {
  const [filter, setFilter] = useState('weekly');


  const getHeading = () => {
    switch (filter) {
      case 'monthly':
        return 'Monthly Ranking';
      case 'yearly':
        return 'Yearly Ranking';
      default:
        return 'Weekly Ranking';
    }
  };

  const buttonStyle = {
    backgroundColor: '#FFC93C',
    border: 'none',
    borderRadius: '15px',
    color: '#000',
    fontSize: '16px',
    fontWeight: '500',
    padding: '10px 20px',
    margin: '0 5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div className='App-page' style={{ backgroundColor: '#3CA3EE', minHeight: '100vh', overflowY: 'auto', paddingBottom: '60px' }}>
      <MenuBar />
      <Grid container spacing={2} style={{ padding: '0 30px' }}>
        <Grid xs={12} style={{ textAlign: 'center', padding: '20px 0' }}>
          <h2 style={{ color: 'white', fontFamily: 'Roboto', fontWeight: '700', fontSize: '60px' }}>
            Leaderboard
          </h2>
        </Grid>
        <Grid xs={8} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', margin: 'auto' }}>
          <div style={{ border: '1px solid black', padding: '20px', marginBottom: '40px', flexGrow: '1', width: '100%', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: 'Roboto', fontWeight: '700', fontSize: '40px', textAlign: 'center', marginBottom: '20px' }}>
              {getHeading()}
            </h2>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <button onClick={() => setFilter('weekly')} style={buttonStyle}>Weekly</button>
              <button onClick={() => setFilter('monthly')} style={buttonStyle}>Monthly</button>
              <button onClick={() => setFilter('yearly')} style={buttonStyle}>Yearly</button>
            </div>
            {dummyData[filter].map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd' }}>
                <span>#{item.rank}</span>
                <span>{item.username}</span>
                <span>{item.points} points</span>
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default LeaderboardPage;