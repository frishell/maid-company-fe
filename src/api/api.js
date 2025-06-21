// src/api.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (form) => {
  const response = await API.post('/login', form);
  return response.data;
};

export const registerUser = async (form) => {
  const response = await API.post('/register', form);
  return response.data;
};

export const logoutUser = async (user) => {
  const response = await API.post('/logout');
  return response.data;
}

export const getAdminStats = async () => {
  try {
    const response = await API.get('/admin/dashboard');
    const pekerjaCount = response.data.pekerjas.length
    const kategoriCount = response.data.kategoris.length
    const kotaCount = response.data.kotas.length
    const provinsiCount = response.data.provinsis.length
    
    return {
      pekerjaCount,
      kategoriCount,
      kotaCount,
      provinsiCount
    };
  } catch (e) {
    alert(e.message)
  }
};

// Provinsi
export const getProvinsiList = async () => {
  const response = await API.get('/provinsi');
  return response.data.data;
};

export const createProvinsi = async (data) => {
  const response = await API.post('/provinsi', data);
  return response.data;
};

export const updateProvinsi = async (id, data) => {
  const response = await API.put(`/provinsi/${id}`, data);
  return response.data;
};

export const deleteProvinsi = async (id) => {
  const response = await API.delete(`/provinsi/${id}`);
  return response.data;
};

// Kota
export const getKotaList = async () => {
  const response = await API.get('/kota');
  return response.data.data;
};

export const createKota = async (data) => {
  const response = await API.post('/kota', data);
  return response.data;
};

export const updateKota = async (id, data) => {
  const response = await API.put(`/kota/${id}`, data);
  return response.data;
};

export const deleteKota = async (id) => {
  const response = await API.delete(`/kota/${id}`);
  return response.data;
};

// Kategori
export const getKategoriList = async () => {
  const response = await API.get('/kategori-pekerja');
  return response.data.data;
};

// Pekerja
export const getPekerjaList = async () => {
  const response = await API.get('/admin/pekerja');
  return response.data;
};

export const getPekerjaListing = async () => {
  const response = await API.get('/home/pekerja')
  return response.data
}

export const createPekerja = async (data) => {
  const response = await API.post('/admin/pekerja', data);
  return response.data;
};

export const updatePekerja = async (id, data) => {
  const response = await API.put(`/admin/pekerja/${id}`, data);
  return response.data;
};

export const deletePekerja = async (id) => {
  const response = await API.delete(`/admin/pekerja/${id}`);
  return response.data;
};