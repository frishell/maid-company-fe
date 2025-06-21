import React, { useState } from 'react';
import { loginUser, registerUser } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


export const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '', role: '1' });
  const navigate = useNavigate()
  const {login, register} = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(form);
      console.log('Login success:', response);
      login(response.user, response.token)
      if (parseInt(response.user.role_id) === 2) {
        navigate('/pekerja-listing');
      } else {
        navigate('/admin');
      }
      // Optionally save token or navigate to dashboard
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen w-screen text-gray-900 flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Login Sebagai</label>
            <select
              className="w-full border p-2 rounded"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="1">Admin</option>
              <option value="2">Customer</option>
              <option value="3">Manager</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded hover:bg-blue-700"
          >
            Log in
          </button>
          <p className='py-4'>Belum Punya Akun? <a href='/register'>Register</a> </p>
        </form>
      </div>
    </div>
  );
};

export const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '', role: '' });
  const navigate = useNavigate()
  const { user, login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(form);
      console.log('Register success:', response);
      login(response.user, response.token)
      if (parseInt(response.user.role_id) == 2) {
        navigate('/pekerja-listing')
        console.log('register', response)
      } else {
        navigate('/admin')
        console.log('register2', response)
      }

      // Optionally navigate to login or show success
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1">Password Confirmation</label>
            <input
              type="password"
              className="w-full border p-2 rounded"
              value={form.password_confirmation}
              onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Register Sebagai</label>
            <select
              className="w-full border p-2 rounded"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="1">Admin</option>
              <option value="2">Customer</option>
              <option value="3">Manager</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Register
          </button>
          <p className='py-4'>Sudah Punya Akun? <a href='/login'>Login</a> </p>
        </form>
      </div>
    </div>
  );
};
