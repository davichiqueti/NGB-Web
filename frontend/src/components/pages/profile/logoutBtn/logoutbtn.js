
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Erro ao fazer logout:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição de logout:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
