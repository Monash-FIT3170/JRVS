import React from 'react'
import avatar from '../assets/images/Avatar.png';



const RegistrationPage = () => {


    return (
        <div className='flex'>
            {/* Left Blue Panel */}
            <div className="h-screen bg-ai-blue w-96"></div>

            {/* Avatar Middle Panel */}
            <div className='h-screen place-content-evenly'>
                {/* Avatar */}
                <div>
                    <img src={avatar} alt='avatar icon'></img></div>
                
                {/* Colour boxes */}
                <div className='flex place-content-evenly'>
                    <div class="rounded-md bg-red-400 w-8 h-8 mr-4"></div>
                    <div class="rounded-md bg-cyan-400 w-8 h-8 mr-4"></div>
                    <div class="rounded-md bg-purple-500 w-8 h-8 mr-4"></div>
                    <div class="rounded-md bg-green-300 w-8 h-8 mr-4"></div>
                </div>
            </div>
        </div>
        
    )
}



export default RegistrationPage;