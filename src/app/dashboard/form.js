'use client';

import { useState } from 'react';

export default function AddStudentForm({ setVisible, refresh, reload }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    studentId: '',
    className: 'Class 10A',
    contact: '',
    attendance: '',
    status: 'Active',
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    console.log(form);

    try {
      const res = await fetch('/api/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.message || 'Failed to add student');
        return;
      }

      setStatus('success');
      setMessage('Student added successfully');

      reload();

      setForm({
        name: '',
        email: '',
        studentId: '',
        className: 'Class 10A',
        contact: '',
        attendance: '',
        status: 'Active',
      });
    } catch (err) {
      setStatus('error');
      setMessage('Network error');
      console.error('Network error:', err);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8">
            <button
        onClick={() => setVisible(false)}
        className="absolute top-4 left-4 px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800 font-medium"
      >
        ← Back
      </button>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add Student
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Username
          </label>
          <input
            type="text"
            name="name"
            placeholder="James Anderson"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="james.anderson@school.edu"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Student ID
          </label>
          <input
            type="text"
            name="studentId"
            placeholder="STU-2024-001"
            value={form.studentId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Class
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
            name="className"
            value={form.className}
            onChange={handleChange}
          >
            <option>Class 10A</option>
            <option>Class 10B</option>
            <option>Class 11A</option>
            <option>Class 11B</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Contact
          </label>
          <input
            type="tel"
            placeholder="+1 234 567 8900"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none  text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Attendance (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="94"
            name="attendance"
            value={form.attendance}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
          />
        </div>











<div className="md:col-span-2">
  <label className="block text-sm font-medium text-gray-600 mb-1">
    Status
  </label>

  <div className="flex gap-4">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="status"
        value="Active"
        checked={form.status === 'Active'}
        onChange={handleChange}
        className="accent-green-600"
      />
      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
        Active
      </span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="status"
        value="Warning"
        checked={form.status === 'Warning'}
        onChange={handleChange}
        className="accent-yellow-500"
      />
      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
        Warning
      </span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="status"
        value="Inactive"
        checked={form.status === 'Inactive'}
        onChange={handleChange}
        className="accent-red-500"
      />
      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
        Inactive
      </span>
    </label>
  </div>
</div>





        

        <div className="md:col-span-2">
          <button
            disabled={status === 'loading'}
            className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50"
          >
            {status === 'loading' ? 'Adding...' : 'Add Student'}
          </button>
        </div>

        {status !== 'idle' && (
          <p
            className={`md:col-span-2 text-sm ${
              status === 'success'
                ? 'text-green-600'
                : status === 'error'
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
