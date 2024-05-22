import React, { useState } from 'react'
import { useApi } from '../context/ApiProvider';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import BotBox from "../components/content/botBox";


const RegistrationPage = () => {
    // Create the hooks for the different inputs
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [school, setSchool] = useState('')
    const [password, setPassword] = useState('')
    const [avatarColor, setAvatarColor] = useState('blue')
    const navigate = useNavigate();

    const {postData} = useApi();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await postData('api/auth/register', {username, firstname, lastname, email, school, password});
          console.log(res);
          navigate('/login');
        } catch (error) {
          console.error('Registration failed', error);
        }
    }


    return (
        <Grid container className="relative h-screen">
            <Grid xs={2}>
                {/* Left Blue Panel */}
                <div className="h-full w-full bg-ai-blue"></div>
            </Grid>

            {/* Avatar Middle Panel */}
            <Grid xs={4} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {/* Avatar */}
                <div>
                    <BotBox
                        backgroundColor="transparent"
                        boxShadow=""
                        width={{ xs: '0px', sm: '0px', md: '400px', lg: '400px', xl: '400px' }}
                        height={{ xs: '0px', sm: '0px', md: '400px', lg: '400px', xl: '400px' }}
                        color={avatarColor}
                    />
                </div>
                
                {/* Colour boxes */}
                <div className='flex place-content-evenly'>
                    <div
                        className="rounded-md bg-red-400 w-8 h-8 mr-4 hover:bg-red-300"
                        onClick={() => setAvatarColor('red')}
                    ></div>
                    <div
                        className="rounded-md bg-cyan-400 w-8 h-8 mr-4 hover:bg-cyan-300"
                        onClick={() => setAvatarColor('blue')}
                    ></div>
                    <div
                        className="rounded-md bg-purple-500 w-8 h-8 mr-4 hover:bg-purple-400"
                        onClick={() => setAvatarColor('purple')}
                    ></div>
                    <div
                        className="rounded-md bg-green-300 w-8 h-8 mr-4 hover:bg-green-200"
                        onClick={() => setAvatarColor('green')}
                    ></div>
                </div>
                </Grid>

            <Grid xs={4} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {/* Form */}
                <form  className="p-5 flex flex-col items-center justify-center space-y-4" onSubmit={handleSubmit}>
                    <p class="text-6xl font-bold text-ai-blue mb-12 text-center">SIGN UP</p>
                    {/* Create the grid layout */}
                    <div class="grid grid-cols-1 gap-6">
                        <div class="flex gap-2">
                            <label>
                                <span class="text-gray-700 mr">First name</span>
                                <input type='text' 
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setFirstname(e.target.value)}
                                value={firstname}
                                ></input>
                            </label>
                            <label>
                                <span class="text-gray-700">Last name</span>
                                <input type='text' 
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setLastname(e.target.value)}
                                value={lastname}
                                ></input>
                            </label>
                        </div>   

                        <label class="block">
                            <span class="text-gray-700">Username</span>
                            <input type='text' 
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            ></input>
                        </label>
                        
                        <label class="block">
                            <span class="text-gray-700">Email</span>
                            <input type="email" 
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                            placeholder="john@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            ></input>
                        </label>

                        <label class="block">
                            <span class="text-gray-700">School</span>
                            <input type="text" 
                            class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e) => setSchool(e.target.value)}
                            value={school}
                            ></input>                    
                        </label>

                        <label class="block">
                            <span class="text-gray-700">Password</span>
                            <input type='password' 
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e)=> setPassword(e.target.value)}
                            value={password}
                            ></input>
                        </label>

                        <label class="block">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Create My Account
                            </button>                    
                        </label>
                    </div>
                </form>
            </Grid>
            <Grid xs={2}>
            </Grid>
        </Grid>
    )
}



export default RegistrationPage;