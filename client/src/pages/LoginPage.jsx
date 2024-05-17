import React, { useState } from 'react'
import Mascot from '../assets/images/Mascot.png';
import Grid from '@mui/material/Unstable_Grid2';
import { useApi } from '../context/ApiProvider';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    // Create the hooks for the different inputs
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const {postData} = useApi();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await postData('api/auth/login', { username, password });
          localStorage.setItem('token', res.data.token);
          navigate('/');
        } catch (error) {
          console.error('Login failed', error);
        }
      };


    return (
        <Grid container className="relative h-screen">
            <Grid xs={3}>
                {/* Left Blue Panel */}
                <div className="h-full w-full bg-ai-blue"></div>
            </Grid>
            <Grid xs={9} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {/* Form */}
                <form className="p-5 flex flex-col items-center justify-center space-y-4" onSubmit={handleSubmit}>
                        <h1 className='russo-one-regular text-7xl text-ai-blue'>JRVS</h1>

                        <div>
                            <span className="text-gray-700">Username</span>
                            <input type='text' 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            ></input>
                        </div>

                        <div>
                            <span className="text-gray-700">Password</span>
                            <input type='text' 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e)=> setPassword(e.target.value)}
                            value={password}
                            ></input>
                        </div>

                        <div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Login
                            </button>                    
                        </div>

                        <p>Don’t have an account? <Link to="/register" className="text-blue-500 hover:text-blue-700">Sign Up</Link></p>
                </form>
            </Grid>
            {/* Avatar Middle Panel */}
            <div className='absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2'>
                {/* Avatar */}
                <div>
                    <img src={Mascot} alt='mascot picture' className="w-0 sm:w-24 md:w-48 lg:w-64 xl:w-80"/>
                </div>
            </div>
        </Grid>
        
    )
}



export default LoginPage;