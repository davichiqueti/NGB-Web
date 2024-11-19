'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthenticated } from '../../../services/authService';
import Link from 'next/link';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  // verify if usar is authenticated
  useEffect(() => { 
    if (isAuthenticated()) {
      router.push('/'); // redirect to home
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData.username, formData.password);
      alert('Login successful!');
      router.push('/'); // Redirect to home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
        <h1 className="text-white">Login</h1>
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
        <button type="submit" className="text-white">
          Login
        </button>
      </form>

      <Link href="/signup"> Don't have an account? Signup </Link>
    </>
  );
};

export default LoginForm;
