import React, { useState } from 'react'
import Mascot from '../assets/images/Mascot.png';
import Logo from '../assets/images/Logo.png';
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
        <div className='flex'>
            {/* Left Blue Panel */}
            <div className="h-screen bg-ai-blue w-96 mr-24"></div>

            {/* Avatar Middle Panel */}
            <div className='h-screen place-content-evenly mr-48'>
                {/* Avatar */}
                <div>
                    <img src={Mascot} alt='mascot picture'></img></div>
            </div>

            {/* Form */}
            <form className='create' onSubmit={handleSubmit}>
                <div className='h-screen place-content-evenly ml-24'>
                    <img src={Logo} alt='Logo Icon'></img>

                    {/* Create the grid layout */}
                    <div className="grid grid-cols-1 gap-6">

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
                    </div>
                </div>
            </form>
        </div>
        
    )
}



export default LoginPage;