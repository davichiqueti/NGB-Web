'use client';

import React, { useState } from 'react';
import ProfileInfo from '@/components/pages/profile/info/profileInfo';
import LogoutButton from '@/components/pages/profile/logoutBtn/logoutbtn';
import UpdateButton from '@/components/pages/profile/updateBtn/updatebtn';
import FollowButton from '@/components/pages/profile/follwBtn/followBtn';
import ProfilePosts from '@/components/pages/profile/profilePosts/profilePosts';

export default function Profile({ user, isLogged, isFollowed }) {
  const [userData, setUserData] = useState(user);

  const handleUserUpdate = (updatedUser) => {
    setUserData(updatedUser);
  };

  return (
    <div className='flex flex-col '>

      <ProfileInfo user={userData}/>

      {isLogged ? 
        <div className='px-4'>
          <UpdateButton user={userData} onUserUpdate={handleUserUpdate} />
          <LogoutButton />
        </div> 
      :
        <div className='px-4'>
          <FollowButton  id={user._id} followStatus={isFollowed} />
        </div>
      }

      <ProfilePosts username={user.username} />
            
    </div>
  );
}
