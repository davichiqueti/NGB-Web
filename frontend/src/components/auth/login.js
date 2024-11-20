'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthenticated } from '../../../services/authService';
import Link from 'next/link';
import Image from 'next/image';

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


    <div className="min-h-screen flex  bg-gray-800">
      <div className="w-1/2 flex flex-col items-center justify-center">

        <img
          src="/logo.png"
          alt="logo"
        />

      </div>


      <div className="w-1/2 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-3/4 max-w-md bg-gray-600 p-6 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold  mb-6">Login</h1>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Password"
            />
          </div>


          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}


          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800"
          >
            Login
          </button>


          <div className="text-center mt-4">
            <p className="text-gray-800">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-gray-900 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};


export default LoginForm;
