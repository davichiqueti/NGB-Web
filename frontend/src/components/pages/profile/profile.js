'use client';

import React, { useState } from 'react';
import ProfileInfo from '@/components/pages/profile/info/profileInfo';
import LogoutButton from '@/components/pages/profile/logoutBtn/logoutbtn';
import UpdateButton from '@/components/pages/profile/updateBtn/updatebtn';

export default function Profile({ user, isLogged }) {
  const [userData, setUserData] = useState(user);

  const handleUserUpdate = (updatedUser) => {
    setUserData(updatedUser);
  };

  return (
    <div className='flex flex-col max-w-3xl h-screen
                    border-r border-slate-400'>

      <ProfileInfo user={userData}/>

      {isLogged ? 
        <div className='px-4'>
          <UpdateButton user={userData} onUserUpdate={handleUserUpdate} />
          <LogoutButton />
        </div> 
      :
        <></>
      }
      
    </div>
  );
}
