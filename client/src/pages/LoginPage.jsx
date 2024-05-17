import React, { useState } from 'react'
import Mascot from '../assets/images/Mascot.png';
import Grid from '@mui/material/Unstable_Grid2';
import { useApi } from '../context/ApiProvider';



const LoginPage = () => {
    // Create the hooks for the different inputs
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const {postData} = useApi();


    const handleSubmit = async (e) =>{
        // stop site from reloading
        e.preventDefault()
    }


    return (
        <Grid container spacing={2} className="relative h-screen">
            <Grid xs={3}>
                {/* Left Blue Panel */}
                <div className="h-full w-full bg-ai-blue"></div>
            </Grid>
            <Grid xs={9} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {/* Form */}
                <form className="p-5 flex flex-col items-center justify-center space-y-4" onSubmit={handleSubmit}>
                        <h1 className='russo-one-regular text-7xl text-ai-blue'>JRVS</h1>

                        <label className="block">
                            <span className="text-gray-700">Username</span>
                            <input type='text' 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            ></input>
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Password</span>
                            <input type='text' 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e)=> setPassword(e.target.value)}
                            value={password}
                            ></input>
                        </label>

                        <label className="block">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Login
                            </button>                    
                        </label>
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