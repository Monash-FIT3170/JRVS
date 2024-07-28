import React, { useState, useEffect } from 'react';
import MenuBar from "../components/MenuBar";
import { useApi } from '../context/ApiProvider';

const LeaderboardPage = () => {
    const { getData } = useApi();
    const [timePeriod, setTimePeriod] = useState('all-time');
    const [userGroup, setUserGroup] = useState('all');
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const leaderboardResponse = await getData(`api/xp/leaderboard?timePeriod=${timePeriod}&userGroup=${userGroup}`);
                const usersResponse = await getData('api/users');

                const userXpMap = {};
                leaderboardResponse.forEach(item => {
                    userXpMap[item.userId] = item.totalXP;
                });

                const completeLeaderboardData = usersResponse.map(user => ({
                    username: user.username,
                    xp: userXpMap[user._id] || 0,
                }));

                setLeaderboardData(completeLeaderboardData.sort((a, b) => b.xp - a.xp));
            } catch (error) {
                console.error(error);
            }
        };

        fetchLeaderboardData();
    }, [timePeriod, userGroup, getData]);

    return (
        <div className='App-page' style={{ height: '100vh' }}>
            <MenuBar />
            <div className="flex flex-col items-center justify-start h-3/4">
                <h2 style={{ color: 'white', fontFamily: 'Roboto', fontWeight: '700', fontSize: '60px' }}>LEADERBOARD</h2>
                <div style={{
                    border: '1px solid black',
                    padding: '20px',
                    marginBottom: '20px',
                    width: '1000px',
                    textAlign: 'center',
                    borderRadius: '20px',
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
                                <th className="py-2">XP</th>
                            </tr>
                            </thead>
                            <tbody>
                            {leaderboardData.map((user, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2">{index + 1}</td>
                                    <td className="py-2">{user.username}</td>
                                    <td className="py-2">{user.xp}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardPage;
