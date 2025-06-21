import React, { useEffect, useState } from 'react';
import {
  getPekerjaList,
  getKategoriList,
  createPekerja,
  updatePekerja,
  deletePekerja
} from '../../api/api';

export default function PekerjaPage() {
  const [pekerjaList, setPekerjaList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [kotas, setKotas] = useState([]);
  const [form, setForm] = useState({ nama_pekerja: '', alamat: '', tgl_lahir: '',   kategoripekerja_id: '', no_hp_ewallet: '', kota_id: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadPekerja()
  }, [])

  const loadPekerja = async () => {
    const response = await getPekerjaList();
    console.log(response)
    setPekerjaList(response.pekerjas);
    setKategoriList(response.kategoris);
    setKotas(response.kotas)
    console.log(pekerjaList, kategoriList)
    // Optional: simpan kotas kalau ingin ditampilkan nanti
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updatePekerja(editId, form);
    } else {
      await createPekerja(form);
    }
    setForm({ nama_pekerja: '', alamat: '', no_hp_ewallet: '', tgl_lahir:'', kategoripekerja_id: '', kota_id: '' });
    setEditId(null);
    loadPekerja();
  };

  const handleEdit = (item) => {
    setForm({ nama: item.nama, alamat: item.alamat, tgl_lahir:item.tgl_lahir, no_hp_ewallet: item.no_hp_ewallet, kategoripekerja_id: item.kategoripekerja_id, kota_id: item.kota_id });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await deletePekerja(id);
    loadPekerja();
  };

  const getKategoriName = (id) => kategoriList.find((k) => k.id === id)?.nama_kategori || '-';
  const getKotaName = (id) => kotas.find((k) => k.id === id)?.nama_kota || '-';


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manajemen Data Pekerja</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Nama"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama_pekerja: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full md:w-auto"
        />
        <input
          type="text"
          placeholder="Alamat Pekerja"
          value={form.alamat}
          onChange={(e) => setForm({ ...form, alamat: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full md:w-auto"
        />
        <input
          type="date"
          placeholder="Tanggal Lahir"
          value={form.tgl_lahir}
          onChange={(e) => setForm({ ...form, tgl_lahir: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full md:w-auto"
        />
        <input
          type="number"
          placeholder="No HP"
          value={form.no_hp_ewallet}
          onChange={(e) => setForm({ ...form, no_hp_ewallet: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full md:w-auto"
        />
        <select
          value={form.kategoripekerja_id}
          onChange={(e) => setForm({ ...form, kategoripekerja_id: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full md:w-auto"
        >
          <option value="">Pilih Kategori</option>
          {kategoriList.map((item) => (
            <option key={item.id} value={item.id}>{item.nama_kategori}</option>
          ))}
        </select>
         <select
          value={form.kota_id}
          onChange={(e) => setForm({ ...form, kota_id: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full md:w-auto"
        >
          <option value="">Pilih Kota</option>
          {kotas.map((item) => (
            <option key={item.id} value={item.id}>{item.nama_kota}</option>
          ))}
        </select>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          {editId ? 'Update' : 'Tambah'}
        </button>
      </form>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">alamat</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Lahir</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">No HP</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kota</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pekerjaList.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2 text-sm">{p.id}</td>
                <td className="px-4 py-2 text-sm">{p.nama_pekerja}</td>
                <td className="px-4 py-2 text-sm">{getKategoriName(p.kategoripekerja_id)}</td>
                <td className="px-4 py-2 text-sm">{p.alamat}</td>
                <td className="px-4 py-2 text-sm">{p.tgl_lahir}</td>
                <td className="px-4 py-2 text-sm">{p.no_hp_ewallet}</td>
                <td className="px-4 py-2 text-sm">{getKotaName(p.kota_id)}</td>
                <td className="px-4 py-2 text-sm space-x-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}