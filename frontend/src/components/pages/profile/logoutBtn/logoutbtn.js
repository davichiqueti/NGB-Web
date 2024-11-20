
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '../../../../../services/userServices';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/auth/login');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className='
        bg-slate-600 hover:bg-slate-700
        text-white font-bold py-2 px-4 rounded'
      >
      Logout
    </button>
  );
}