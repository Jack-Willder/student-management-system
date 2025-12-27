'use client';

import { useState } from 'react';

export default function Login() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setMessage(data.message);

    if (data.success) {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Login</h1>
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Logo" className="mx-auto mb-2 w-16 h-16" />
          <p className="text-lg font-semibold text-gray-700">Student Management App</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              defaultValue="admin@gmail.com"
              className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/6 text-gray-400">📧</span>
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              defaultValue="admin"
              className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/6 text-gray-400">🔒</span>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 hover:scale-105"
          >
            Sign In
          </button>
        </form>
        {message && (message === 'Login successful' ? (
          <p className="mt-4 text-green-600 text-center">{message}</p>
        ) : (
          <p className="mt-4 text-red-600 text-center">{message}</p>
        ))}
      </div>
    </div>
  );
}