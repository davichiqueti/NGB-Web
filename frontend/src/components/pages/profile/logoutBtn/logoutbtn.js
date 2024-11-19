
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
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
