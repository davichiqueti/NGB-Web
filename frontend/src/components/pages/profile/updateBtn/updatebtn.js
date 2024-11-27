'use client';

import React, { useState } from 'react';
// Não precisamos do useRouter aqui, a menos que queira redirecionar após a atualização
import EditProfileModal from '@/components/pages/profile/editProfileModal/editprofilemodal';

export default function UpdateButton({ user, onUserUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = () => {
    // Abre o modal de edição
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Fecha o modal de edição
    setIsModalOpen(false);
  };

  return (
    <>
      <button 
        onClick={handleUpdate}
        className='
          bg-slate-600 hover:bg-slate-700 mr-2
          text-white font-bold py-2 px-4 rounded'
        >
        Editar Perfil
      </button>
      {isModalOpen && (
        <EditProfileModal 
          user={user} 
          onClose={handleCloseModal} 
          onUserUpdate={onUserUpdate} 
        />
      )}
    </>
  );
}
