'use client';

import React, { useState } from 'react';
import ProfileInfo from '@/components/pages/profile/info/profileInfo';
import LogoutButton from '@/components/pages/profile/logoutBtn/logoutbtn';
import UpdateButton from '@/components/pages/profile/updateBtn/updatebtn';

export default function Profile({ user }) {
  const [userData, setUserData] = useState(user);

  const handleUserUpdate = (updatedUser) => {
    setUserData(updatedUser);
  };

  return (
    <div className='flex flex-col'>
      <ProfileInfo user={userData} />
      <div >
        <UpdateButton user={userData} onUserUpdate={handleUserUpdate} />
        <LogoutButton />
      </div>
    </div>
  );
}
