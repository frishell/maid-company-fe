import React, { useEffect, useState } from 'react';
import { getAdminStats } from '../../api/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ kategoriCount: 0, kotaCount: 0, pekerjaCount: 0, provinsiCount: 0 });

  useEffect(() => {
    getAdminStats().then(setStats);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardCard title="Total Provinsi" value={stats.kategoriCount} />
        <DashboardCard title="Total Kota" value={stats.kotaCount} />
        <DashboardCard title="Total Pekerja" value={stats.pekerjaCount} />
        <DashboardCard title="Total Kota" value={stats.provinsiCount} />
      </div>
    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
      <div className="text-sm text-gray-600 mb-1">{title}</div>
      <div className="text-3xl font-bold text-indigo-700">{value}</div>
    </div>
  );
}
