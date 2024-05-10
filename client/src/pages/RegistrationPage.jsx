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
            <div className='h-screen place-content-evenly ml-48'>
                <p class="text-6xl font-bold text-ai-blue mb-12">SIGN UP</p>
                <div>
                    <input type='text'></input>
                </div>
            </div>
        </div>
        
    )
}



export default RegistrationPage;