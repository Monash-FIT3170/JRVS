import React, { useState } from 'react'
import avatar from '../assets/images/Avatar.png';



const RegistrationPage = () => {
    // Create the hooks for the different inputs
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [school, setSchool] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) =>{
        // stop site from reloading
        e.preventDefault()

        // create user object to post
        const user = {username: userName, firstname: firstName, lastname: lastName, email: email, school: school, password: password}


        // call a fetch to POST the user
        const response = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })

        // receive json
        const json = await response.json()

        // error check
        if(!response.ok){
            console.log(json.error)
        }

        // if response ok then console log user added
        if(response.ok){
            setUserName('')
            setFirstName('')
            setLastName('')
            setEmail('')
            setSchool('')
            setPassword('')
            console.log('new user added', json)
        }
    }


    return (
        <div className='flex'>
            {/* Left Blue Panel */}
            <div className="h-screen bg-ai-blue w-96 mr-24"></div>

            {/* Avatar Middle Panel */}
            <div className='h-screen place-content-evenly mr-48'>
                {/* Avatar */}
                <div>
                    <img src={avatar} alt='avatar icon'></img></div>
                
                {/* Colour boxes */}
                <div className='flex place-content-evenly'>
                    <div class="rounded-md bg-red-400 w-8 h-8 mr-4 hover:bg-red-300"></div>
                    <div class="rounded-md bg-cyan-400 w-8 h-8 mr-4 hover:bg-cyan-300"></div>
                    <div class="rounded-md bg-purple-500 w-8 h-8 mr-4 hover:bg-purple-400"></div>
                    <div class="rounded-md bg-green-300 w-8 h-8 mr-4 hover:bg-green-200"></div>
                </div>
            </div>

            {/* Form */}
            <form className='create' onSubmit={handleSubmit}>
                <div className='h-screen place-content-evenly ml-24'>
                    <p class="text-6xl font-bold text-ai-blue mb-12 text-center">SIGN UP</p>
                    {/* Create the grid layout */}
                    <div class="grid grid-cols-1 gap-6">
                        <div class="flex gap-2">
                            <label>
                                <span class="text-gray-700 mr">First name</span>
                                <input type='text' 
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                ></input>
                            </label>
                            <label>
                                <span class="text-gray-700">Last name</span>
                                <input type='text' 
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                ></input>
                            </label>
                        </div>   

                        <label class="block">
                            <span class="text-gray-700">Username</span>
                            <input type='text' 
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
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
                            <input type="search" 
                            class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e) => setSchool(e.target.value)}
                            value={school}
                            ></input>                    
                        </label>

                        <label class="block">
                            <span class="text-gray-700">Password</span>
                            <input type='text' 
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
                </div>
            </form>
        </div>
        
    )
}



export default RegistrationPage;