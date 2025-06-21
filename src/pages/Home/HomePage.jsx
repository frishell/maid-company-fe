import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logoutUser } from '../../api/api';

const HomePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate()

  useEffect(() => {
    // Any needed initialization
  }, []);

  const handleLogout = () => {
    logoutUser()
    logout() // Hapus token auth
    navigate('/');
  };

  return (
    <div className="w-screen bg-gray-900 text-white">

      {/* Header */}
      <header className="bg-gray-900 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">
            <Link to="/">Maid Company</Link>
          </h3>
          <nav className="space-x-6">
            <Link style={{ textDecoration: 'none' }} to="/" className="text-white hover:text-blue-400">Beranda</Link>
            <Link to="/pekerja-listing" className="hover:text-blue-400">Cari Pekerja</Link>
            {user? (
              <button onClick={handleLogout} className="hover:text-blue-400">Logout</button>
            ) : 
            (
              <Link to="/login" className="hover:text-blue-400">Masuk</Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-gray-900 to-indigo-900">
        <h1 className="text-5xl font-extrabold mb-4">Temukan Asisten Rumah Tangga Terbaik</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Kami menyediakan ART dan Baby Sitter profesional yang siap membantu kebutuhan rumah tangga Anda.
        </p>
        <Link
          to="/pekerja-listing"
          className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
        >
          Lihat Daftar Pekerja
        </Link>
      </section>

      {/* Highlight Stats */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 text-center gap-6">
          {[{ label: 'Pekerja Tersedia', count: 120 }, { label: 'Kota Terdaftar', count: 20 }, { label: 'Kategori Pekerjaan', count: 3 }, { label: 'Pelanggan Puas', count: 8000 }].map((stat, idx) => (
            <div key={idx}>
              <div className="text-4xl font-bold text-blue-500">{stat.count}</div>
              <div className="text-sm text-gray-400 mt-2 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Cara Kerja Kami</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[{
              title: 'Cari Pekerja',
              desc: 'Gunakan filter pencarian untuk menemukan ART sesuai kota dan kebutuhan Anda.',
              icon: '🔍'
            }, {
              title: 'Lihat Profil',
              desc: 'Tinjau informasi lengkap, foto, dan pengalaman dari setiap pekerja.',
              icon: '👩‍🍳'
            }, {
              title: 'Hubungi Langsung',
              desc: 'Hubungi pekerja melalui kontak yang tersedia untuk membuat kesepakatan.',
              icon: '📞'
            }].map((step, idx) => (
              <div key={idx} className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-3">{step.icon}</div>
                <h4 className="font-bold text-xl mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Apa Kata Mereka?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white p-6 rounded-lg shadow">
                <p className="italic text-gray-600 mb-4">"Pelayanan sangat cepat dan ART yang saya temukan sangat profesional!"</p>
                <div className="flex items-center gap-4">
                  <img src={`/client-face${n}.png`} alt="Client" className="w-12 h-12 rounded-full" />
                  <div>
                    <h4 className="font-semibold">Pengguna {n}</h4>
                    <p className="text-sm text-gray-500">Konsumen</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
