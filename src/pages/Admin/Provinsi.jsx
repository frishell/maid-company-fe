import React, { useEffect, useState } from 'react';
import { getProvinsiList, createProvinsi, updateProvinsi, deleteProvinsi, getKotaList, deleteKota, updateKota, createKota } from '../../api/api';

export default function ProvinsiPage() {
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);

  const [form, setForm] = useState({ nama_provinsi: '' });
  const [kotaForm, setKotaForm] = useState({ nama_kota: '', provinsi_id: '' });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadProvinsi();
    loadKota();
  }, []);

  const loadProvinsi = async () => {
    const data = await getProvinsiList();
    setProvinsi(data);
  };

  const loadKota = async () => {
    const data = await getKotaList();
    setKota(data);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateProvinsi(editId, form);
    } else {
      await createProvinsi(form);
    }
    setForm({ nama_provinsi: '' });
    setEditId(null);
    loadProvinsi();
  };

  const handleKotaSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateKota(editId, kotaForm);
    } else {
      await createKota(kotaForm);
    }
    setKotaForm({ nama_kota: '', provinsi_id: '' });
    setEditId(null);
    loadKota();
  };

  const handleEdit = (item, type) => {
    if (type === 'kota') {
      setKotaForm({ nama_kota: item.nama_kota, provinsi_id: item.provinsi_id });
    } else {
      setForm({ nama_provinsi: item.nama_provinsi });
    }
    setEditId(item.id);
  };

  const handleDelete = async (type, id) => {
    if (type == 'kota') {
        await deleteKota(id);
        loadKota();

    } else {
        deleteProvinsi(id);
        loadProvinsi();
    }
  };

  return (
    <div className="p-6 text-gray-900">
      <h2 className="text-xl font-semibold mb-4">Manajemen Provinsi</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Nama Provinsi"
          value={form.nama_provinsi}
          onChange={(e) => setForm({ ...form, nama_provinsi: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          {editId ? 'Update' : 'Tambah'}
        </button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {provinsi.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.nama_provinsi}</td>
              <td className="border px-4 py-2 space-x-2">
                <button onClick={() => handleEdit(item, 'provinsi')} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete('provinsi', item.id)} className="text-red-600 hover:underline">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-24 text-xl font-semibold mb-4">Manajemen Kota</h2>

      <form onSubmit={handleKotaSubmit} className="mb-6 flex gap-4">
        <select
          value={kotaForm.provinsi_id}
          onChange={(e) => setKotaForm({ ...kotaForm, provinsi_id: e.target.value })}
          className="border border-gray-300 p-2 rounded"
          required
        >
          <option value="">Pilih Provinsi</option>
          {provinsi.map((p) => (
            <option key={p.id} value={p.id}>{p.nama_provinsi}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nama Nama Kota"
          value={kotaForm.nama_kota}
          onChange={(e) => setKotaForm({ ...kotaForm, nama_kota: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          {editId ? 'Update' : 'Tambah'}
        </button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kota.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.nama_kota}</td>
              <td className="border px-4 py-2 space-x-2">
                <button onClick={() => handleEdit(item, 'kota')} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete('kota', item.id)} className="text-red-600 hover:underline">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
