import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Contact,
  ClipboardList,
  ReceiptText,
  MessagesSquare,
  LogOut,
  User,
  Settings,
  CreditCard,
  Github
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { logoutUser } from '../../api/api';

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logoutUser()
    logout()
    navigate('/login')
     // Redirect ke login page
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 w-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 border-b flex items-center justify-between">
          <Link to="/admin" className="text-xl font-bold text-indigo-600">
            MaidCompany
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          <NavItem to="/admin" icon={<LayoutDashboard size={18} />}>Dashboard</NavItem>
          <NavItem to="/admin/pekerja" icon={<ClipboardList size={18} />}>Pekerja</NavItem>
          <NavItem to="/admin/provinsi" icon={<Building2 size={18} />}>Provinsi</NavItem>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white text-gray-900 shadow-sm px-6 py-3 flex justify-between items-center">
          <div className="text-lg font-semibold">Admin Panel</div>
          <div className="flex items-center gap-4">
            
              <Github className="inline mr-1" size={18} />
            <div onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 flex items-center text-gray-900"><LogOut className="mr-2" size={16} />Log Out</div>

            <div className="relative group">
              <img
                src="/avatars/1.png"
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="absolute right-0 top-12 bg-white shadow-md rounded w-48 hidden group-hover:block">
                <div className="p-4 border-b">
                  <div className="font-semibold">John Doe</div>
                  <div className="text-sm text-gray-500">Admin</div>
                </div>
                <ul className="text-sm">
                  <li><Link to="/admin/profile" className="block px-4 py-2 hover:bg-gray-100 flex items-center"><User className="mr-2" size={16} /> My Profile</Link></li>
                  <li><Link to="/admin/settings" className="block px-4 py-2 hover:bg-gray-100 flex items-center"><Settings className="mr-2" size={16} /> Settings</Link></li>
                  <li><Link to="/admin/billing" className="block px-4 py-2 hover:bg-gray-100 flex items-center justify-between"><span className="flex items-center"><CreditCard className="mr-2" size={16} /> Billing</span><span className="bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">4</span></Link></li>
                  <li><Link to="/logout" className="block px-4 py-2 hover:bg-gray-100 flex items-center text-red-600"><LogOut className="mr-2" size={16} /> Log Out</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 flex-grow">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t p-4 text-sm flex flex-col sm:flex-row justify-between">
          <div>
            © {new Date().getFullYear()}, made with ❤️ by <a href="https://themeselection.com" className="font-bold" target="_blank" rel="noreferrer">JPD</a>
          </div>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="https://themeselection.com/license/" target="_blank" rel="noreferrer" className="hover:underline">License</a>
            <a href="https://themeselection.com/" target="_blank" rel="noreferrer" className="hover:underline">More Themes</a>
            <a href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/" target="_blank" rel="noreferrer" className="hover:underline">Documentation</a>
            <a href="https://github.com/themeselection/sneat-html-admin-template-free/issues" target="_blank" rel="noreferrer" className="hover:underline">Support</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

function NavItem({ to, icon, children }) {
  return (
    <Link
      to={to}
      className="flex items-center px-3 py-2 rounded hover:bg-indigo-100 text-sm font-medium text-gray-700"
    >
      <span className="mr-2">{icon}</span>
      {children}
    </Link>
  );
}