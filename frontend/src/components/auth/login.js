"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link"

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  // Verifica se o usuário já está autenticado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/'); // Redireciona para uma rota protegida
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        alert('Login successful!');
        router.push('/'); // Redireciona para uma rota protegida
      } else {
        const error = await response.json();
        setError(error.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (

    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
        <h1 className='text-white'>Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className='text-white'>Login</button>
      </form>

      <Link href="/auth/signup"> Don't have as account? Signup </Link>

    </>
  );
};

export default LoginForm;
