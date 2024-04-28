import React from 'react';
import LeftSidebar from '../components/LeftSidebar';


const ProfilePage = () => {
  return (
    <div>
        <LeftSidebar />
        <div className='ml-48'>
          <h2 className='russo-one-regular text-6xl'>Welcome User</h2>
        </div>
    </div>
  );
}

export default ProfilePage;