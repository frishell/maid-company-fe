import React, { useEffect, useState } from 'react';
import { getPekerjaList, getPekerjaListing, logoutUser } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PekerjaListingPage = () => {
  const [pekerjas, setPekerjas] = useState([]);
  const [filteredPekerjas, setFilteredPekerjas] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [kotas, setKotas] = useState([]);
  const [selectedKota, setSelectedKota] = useState('');
  const [sortBy, setSortBy] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    logout() // Hapus token auth
    navigate('/'); // Redirect ke login page
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchKeyword, selectedKota, sortBy, pekerjas]);

  const loadData = async () => {
    const res = await getPekerjaListing();
    setPekerjas(res.pekerjas);
    setKotas(res.kotas);
    console.log('LISTINGG', kotas, pekerjas)
  };

  const handleFilter = () => {
    let data = [...pekerjas];
    if (searchKeyword) {
      data = data.filter(p => p.nama_pekerja.toLowerCase().includes(searchKeyword.toLowerCase()));
    }
    if (selectedKota) {
      data = data.filter(p => p.kota_id === parseInt(selectedKota));
    }
    if (sortBy === 'nama') {
      data.sort((a, b) => a.nama_pekerja.localeCompare(b.nama_pekerja));
    } else if (sortBy === 'umur') {
      data.sort((a, b) => a.umur - b.umur);
    }
    setFilteredPekerjas(data);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen w-screen">
      {/* Page header */}

      <header className="bg-gray-900 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">
            <Link to="/">Maid Company</Link>
          </h3>
          <nav className="space-x-6">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <Link to="/pekerja-listing" className="hover:text-blue-400">Pekerja</Link>
            {user? (
              <button onClick={handleLogout} className="hover:text-blue-400">Logout</button>
            ) : 
            (
              <Link to="/login" className="hover:text-blue-400">Masuk</Link>
            )}
          </nav>
        </div>
      </header>

      <div className="bg-gray-800 py-6 mb-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Cari Pekerja</h1>
          <p className="text-gray-400">Temukan ART atau Baby Sitter terbaik sesuai kebutuhan Anda</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white text-gray-800 p-4 shadow rounded">
            <h3 className="font-semibold mb-3">Pencarian Pintar</h3>
            <form onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                placeholder="Kata kunci"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full border p-2 rounded mb-3"
              />
              <select
                value={selectedKota}
                onChange={(e) => setSelectedKota(e.target.value)}
                className="w-full border p-2 rounded mb-3"
              >
                <option value="">Pilih Kota</option>
                {kotas.map(kota => (
                  <option key={kota.id} value={kota.id}>{kota.nama_kota}</option>
                ))}
              </select>
              <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Cari</button>
            </form>
          </div>

          <div className="bg-white text-gray-800 p-4 shadow rounded">
            <h3 className="font-semibold mb-3">Rekomendasi</h3>
            <ul className="space-y-3">
              {[1, 2, 3].map((item) => (
                <li key={item} className="flex gap-3">
                  <img src="/property-1.jpg" alt="recommended" className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h6 className="font-medium">ART Berpengalaman</h6>
                    <span className="text-sm text-gray-600">3 tahun pengalaman</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Property listing */}
        <div className="col-span-1 md:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Urutkan:</span>
              <button className="ml-2 text-blue-400" onClick={() => setSortBy('nama')}>Nama</button>
              <button className="ml-2 text-gray-400" onClick={() => setSortBy('umur')}>Umur</button>
            </div>
            <div>
              <label className="mr-2">Tampilkan:</label>
              <select className="border p-1 rounded text-gray-800">
                <option>12</option>
                <option>24</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {filteredPekerjas.map((p) => (
              <div key={p.id} className="bg-white text-gray-800 border rounded overflow-hidden shadow hover:shadow-lg">
                <img src={`/pekerja/${p.foto_pekerja}` || '/slide1/slider-image-2.jpg'} alt="Pekerja" className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h5 className="font-bold text-lg mb-1">{p.nama_pekerja}</h5>
                  <p className="text-sm text-gray-500 mb-2">{p.deskripsi_pekerja}</p>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>📍 {p.kota?.nama_kota}</span>
                    <span>📅 {p.umur} Tahun</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="flex justify-end">
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded bg-white text-gray-800 hover:bg-gray-100">Prev</button>
              {[1, 2, 3, 4].map((n) => (
                <button key={n} className="px-3 py-1 border rounded bg-white text-gray-800 hover:bg-blue-600 hover:text-white">{n}</button>
              ))}
              <button className="px-3 py-1 border rounded bg-white text-gray-800 hover:bg-gray-100">Next</button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PekerjaListingPage;
