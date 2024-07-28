import React, { useState, useEffect } from 'react';
import MenuBar from "../components/MenuBar";

const Leaderboard = () => {
    const [timePeriod, setTimePeriod] = useState('all-time');
    const [userGroup, setUserGroup] = useState('all');
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        // Fetch leaderboard data based on selected filters
        const fetchLeaderboardData = async () => {
            // Here you would make an API request to your backend to fetch leaderboard data
            // based on the selected time period and user group
            // For example:
            // const response = await fetch(`/api/leaderboard?timePeriod=${timePeriod}&userGroup=${userGroup}`);
            // const data = await response.json();
            // setLeaderboardData(data);

            // Mock data for demonstration
            const mockData = [
                { username: 'user1', xp: 150 },
                { username: 'user2', xp: 120 },
                { username: 'user3', xp: 100 },
            ];
            setLeaderboardData(mockData);
        };

        fetchLeaderboardData();
    }, [timePeriod, userGroup]);

    return (
        <div className='App-page'>
            <MenuBar/>
            <div className="flex flex-col items-center justify-start">
                <h2 style={{color: 'white', font: 'Roboto', fontWeight: '700', fontSize: '60px'}}>LEADERBOARD</h2>
                <div style={{
                    border: '1px solid black',
                    padding: '20px',
                    marginBottom: '20px',
                    width: '1000px',
                    textAlign: 'center',
                    borderRadius: '20px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                    maxHeight: 'calc(100vh - 200px)', // Adjust based on MenuBar height
                    overflowY: 'auto'
                }}>
                    <div className="flex justify-center mb-4">
                        <h2 style={{
                            color: 'black',
                            font: 'Roboto',
                            fontWeight: '500',
                            fontSize: '20px',
                            padding: '5px'
                        }}>Time Period:</h2>
                        <select
                            className="border p-2 rounded w-32"
                            value={timePeriod}
                            onChange={(e) => setTimePeriod(e.target.value)}
                        >
                            <option value="day">Last Day</option>
                            <option value="week">Last Week</option>
                            <option value="month">Last Month</option>
                            <option value="all-time">All Time</option>
                        </select>
                        <h2 style={{
                            color: 'black',
                            font: 'Roboto',
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
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                        <tr>
                            <th className="py-2">Username</th>
                            <th className="py-2">XP</th>
                        </tr>
                        </thead>
                        <tbody>
                        {leaderboardData.map((user, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2">{user.username}</td>
                                <td className="py-2">{user.xp}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
