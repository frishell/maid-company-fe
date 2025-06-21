import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/Home/HomePage';
import { LoginPage, RegisterPage } from './pages/Auth/LoginRegister';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import ProvinsiPage from './pages/Admin/Provinsi';
import PekerjaPage from './pages/Admin/Pekerja';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import PekerjaListingPage from './pages/Home/PekerjaListingPage';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pekerja-listing" element={
          <ProtectedRoute allowedRoles={[1,2,3,4]}>
            <PekerjaListingPage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={
            <ProtectedRoute allowedRoles={[1,3,4]}>
              <AdminDashboard/>
            </ProtectedRoute>
          } />
          <Route path="provinsi" element={
            <ProtectedRoute allowedRoles={[1,3,4]}>
              <ProvinsiPage />
            </ProtectedRoute>
          } />
          <Route path="pekerja" element={
            <ProtectedRoute allowedRoles={[1,3,4]}>
              <PekerjaPage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
