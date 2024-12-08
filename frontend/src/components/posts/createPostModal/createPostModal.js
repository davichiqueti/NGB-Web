'use client';

import { useState } from 'react';
import { createPost } from '../../../../services/postServices';

export default function CreatePostModal({ onClose }) {
  const [formData, setFormData] = useState({
    text: '',
    img: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chama o método createPost com os dados do formulário
      await createPost(formData);  
      alert('Post criado com sucesso!');
      onClose(); 
    } catch (error) {
      console.error(error.message);
      alert('Erro ao criar o post.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-700 p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl mb-4 text-white">Criar novo post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Texto:</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              className="w-full border p-2 text-black"
              placeholder="O que está acontecendo?"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Imagem:</label>
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
              className="w-full border p-2 text-black"
              placeholder="Insira o link da imagem"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
