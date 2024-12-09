'use client';

import '@/styles/globals.css';
import React, { useState, useEffect } from 'react';
import Post from '../../src/components/posts/post'; // Importando o componente Post

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/posts/all`);
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError('Erro ao carregar os posts. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Últimos Posts</h1>
      <div className="grid grid-cols-1 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post._id} post={post} /> // Utilizando o componente Post para renderizar cada post
          ))
        ) : (
          <div className="text-center text-gray-500">Nenhum post encontrado.</div>
        )}
      </div>
    </div>
  );
}
