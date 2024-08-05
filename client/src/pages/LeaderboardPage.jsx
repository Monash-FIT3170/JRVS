import React, { useState, useEffect } from 'react';
import MenuBar from "../components/MenuBar";
import { useApi } from '../context/ApiProvider';
import Grid from "@mui/material/Unstable_Grid2";

const LeaderboardPage = () => {
    const { getData, postData } = useApi();
    const [timePeriod, setTimePeriod] = useState('all-time');
    const [userGroup, setUserGroup] = useState('all');
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                let startDate, endDate;
                const endDateObj = new Date();
                const startDateObj = new Date();

                switch (timePeriod) {
                    case 'day':
                        startDateObj.setDate(endDateObj.getDate() - 1);
                        break;
                    case 'week':
                        startDateObj.setDate(endDateObj.getDate() - 7);
                        break;
                    case 'month':
                        startDateObj.setMonth(endDateObj.getMonth() - 1);
                        break;
                    case 'all-time':
                    default:
                        startDateObj.setFullYear(1970);
                        break;
                }

                startDate = startDateObj.toISOString();
                endDate = endDateObj.toISOString();

                const leaderboardResponse = await getData(`api/xp/leaderboard?startDate=${startDate}&endDate=${endDate}&userGroup=${userGroup}`);

                setLeaderboardData(leaderboardResponse.sort((a, b) => b.totalXP - a.totalXP));
            } catch (error) {
                console.error(error);
            }
        };

        fetchLeaderboardData();
    }, [timePeriod, userGroup, getData]);

    return (
        <div className='App-page' style={{ height:'100vh' }}>
            <MenuBar />
            <Grid container spacing={2} style={{ padding: '0 30px 0 20px'}}>
                <Grid xs={12} style={{ padding: '0 0 10px 40px', textAlign: 'center'}}>
                    <h2 style={{ color: 'white', font: 'Roboto', fontWeight: '700', fontSize: '60px' }}>LEADERBOARD</h2>
                </Grid>
                <Grid xs={0} md={3}></Grid>
                <Grid xs={12} md={6} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{
                        border: '1px solid black',
                        padding: '20px',
                        marginBottom: '20px',
                        textAlign: 'center',
                        borderRadius: '20px',
                        height: '65vh',
                        width: '100%',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        backgroundColor: 'white',
                        overflowY: 'hidden'
                    }}>
                        <div className="flex justify-center mb-4">
                            <h2 style={{
                                color: 'black',
                                fontFamily: 'Roboto',
                                fontWeight: '500',
                                fontSize: '20px',
                                padding: '5px'
                            }}>Time Period:</h2>
                            <select
                                className="border p-2 rounded w-32"
                                value={timePeriod}
                                onChange={(e) => setTimePeriod(e.target.value)}
                            >
                                <option value="all-time">All Time</option>
                                <option value="month">Last Month</option>
                                <option value="week">Last Week</option>
                                <option value="day">Today</option>
                            </select>
                            <h2 style={{
                                color: 'black',
                                fontFamily: 'Roboto',
                                fontWeight: '500',
                                fontSize: '20px',
                                padding: '5px',
                                paddingLeft: '20px'
                            }}>Users:</h2>
                            <select
                                className="border p-2 rounded w-32"
                                value={userGroup}
                                onChange={(e) => setUserGroup(e.target.value)}
                            >
                                <option value="all">All Users</option>
                                <option value="school">Your School</option>
                                <option value="class">Your Class</option>
                            </select>
                        </div>
                        <div style={{
                            textAlign: 'center',
                            backgroundColor: 'white',
                            maxHeight: '100%',
                            overflowY: 'scroll'
                        }}>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                <tr>
                                    <th className="py-2">Rank</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">School</th>
                                    <th className="py-2">XP</th>
                                </tr>
                                </thead>
                                <tbody>
                                {leaderboardData.map((user, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-2">{index + 1}</td>
                                        <td className="py-2">{user.username}</td>
                                        <td className="py-2">{user.school}</td>
                                        <td className="py-2">{user.totalXP}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Grid>
                <Grid xs={0} md={3} ></Grid>
            </Grid>
        </div>
    );
};

export default LeaderboardPage;

