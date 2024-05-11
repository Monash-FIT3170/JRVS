import React from 'react'
import avatar from '../assets/images/Avatar.png';



const RegistrationPage = () => {


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
            <div className='h-screen place-content-evenly ml-24'>
                <p class="text-6xl font-bold text-ai-blue mb-12 text-center">SIGN UP</p>
                <div class="grid grid-cols-1 gap-6">
                    <label class="block">
                        <span class="text-gray-700 mr-48">First name</span>
                        <span class="text-gray-700">Last name</span>
                        <div class="flex">
                            <input type='text' class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-12"></input>
                            <input type='text' class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></input>
                        </div>   
                    </label>

                    <label class="block">
                        <span class="text-gray-700">Username</span>
                        <input type='text' class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></input>
                    </label>
                    
                    <label class="block">
                        <span class="text-gray-700">Email</span>
                        <input type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="john@example.com"></input>
                    </label>

                    <label class="block">
                        <span class="text-gray-700">School</span>
                        <input type="search" class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></input>                    
                    </label>

                    <label class="block">
                        <span class="text-gray-700">Password</span>
                        <input type='text' class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></input>
                    </label>

                    <label class="block">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Create My Account
                        </button>                    
                    </label>
                </div>
            </div>
        </div>
        
    )
}



export default RegistrationPage;