"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signup, isAuthenticated } from '../../../services/authService';
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

  // check if user is authenticated
  useEffect(() => {
      if (isAuthenticated()){
        router.push('/'); //redirect to home
      }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signup(formData)
      alert('Login successful!');
      router.push('/'); // Redirect to home
    } catch(err){
      setError(err.message)
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

    <Link href='/login'> Already have an account? login</Link>

    </>
  );
};

export default SignupForm;
