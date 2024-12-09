'use client';

import React, { useState, useRef } from 'react';
import ProfileInfo from '@/components/pages/profile/info/profileInfo';
import LogoutButton from '@/components/pages/profile/logoutBtn/logoutbtn';
import UpdateButton from '@/components/pages/profile/updateBtn/updatebtn';
import FollowButton from '@/components/pages/profile/follwBtn/followBtn';
import ProfilePosts from '@/components/pages/profile/profilePosts/profilePosts';

export default function Profile({ user, isLogged, isFollowed }) {
  const [userData, setUserData] = useState(user);

  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const handleUserUpdate = (updatedUser) => {
    setUserData(updatedUser);
    // Resetar as imagens após atualização bem-sucedida
    setCoverImg(null);
    setProfileImg(null);
  };

  const handleImgChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'cover') {
          setCoverImg(reader.result);
          setUserData({ ...userData, cover_img: reader.result });
        }
        if (type === 'profile') {
          setProfileImg(reader.result);
          setUserData({ ...userData, profile_img: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='flex flex-col'>
      {/* Botão para editar capa */}
      {isLogged && (
        <div className='flex justify-end p-4'>
          <button
            onClick={() => coverImgRef.current.click()}
            className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded mr-2'
          >
            Editar Capa
          </button>
          <button
            onClick={() => profileImgRef.current.click()}
            className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded'
          >
            Editar Foto de Perfil
          </button>
        </div>
      )}

      <ProfileInfo user={userData} />

      {isLogged ? (
        <div className='px-4'>
          <UpdateButton
            user={userData}
            onUserUpdate={handleUserUpdate}
            cover_img={coverImg}
            profile_img={profileImg}
          />
          <LogoutButton />
        </div>
      ) : (
        <div className='px-4'>
          <FollowButton id={user._id} followStatus={isFollowed} />
        </div>
      )}

      <ProfilePosts username={user.username} />

      {/* Inputs de arquivo ocultos */}
      <input
        type='file'
        ref={coverImgRef}
        style={{ display: 'none' }}
        accept='image/*'
        onChange={(e) => handleImgChange(e, 'cover')}
      />
      <input
        type='file'
        ref={profileImgRef}
        style={{ display: 'none' }}
        accept='image/*'
        onChange={(e) => handleImgChange(e, 'profile')}
      />
    </div>
  );
}
