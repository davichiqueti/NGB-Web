"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Verifica se o usuário já está autenticado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard'); // Redireciona para uma rota protegida
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        alert('Signup successful! Please login.');
        router.push('/auth/login'); // Redireciona para a página de login
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
      <h1 className="text-white">Signup</h1>
      <input
        type="text"
        name="full_name"
        placeholder="Full Name"
        value={formData.full_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
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
      <button type="submit" className="text-white">Create Account</button>
    </form>

    <Link href='/auth/login'> Already have an account? login</Link>

    </>
  );
};

export default SignupForm;
