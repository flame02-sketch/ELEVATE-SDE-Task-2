import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut } from 'lucide-react';
import { useCredVault } from '../context/CredVaultContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdminAuthenticated, logoutAdmin } = useCredVault();

  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
          <ShieldCheck className="w-7 h-7 text-emerald-400" />
          <span>CredVault</span>
        </Link>

        <div className="flex flex-wrap items-center gap-5 text-sm font-medium">
          <Link
            to="/"
            className={`hover:text-emerald-400 transition ${
              location.pathname === '/' ? 'text-emerald-400' : 'text-slate-300'
            }`}
          >
            Home
          </Link>
          <Link
            to="/request"
            className={`hover:text-emerald-400 transition ${
              location.pathname === '/request' ? 'text-emerald-400' : 'text-slate-300'
            }`}
          >
            Request
          </Link>
          <Link
            to="/track"
            className={`hover:text-emerald-400 transition ${
              location.pathname === '/track' ? 'text-emerald-400' : 'text-slate-300'
            }`}
          >
            Track
          </Link>
          <Link
            to="/verify"
            className={`hover:text-emerald-400 transition ${
              location.pathname === '/verify' ? 'text-emerald-400' : 'text-slate-300'
            }`}
          >
            Verify
          </Link>

          <span className="text-slate-600">|</span>

          {isAdminAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                to="/admin/applications"
                className={`hover:text-amber-400 transition ${
                  location.pathname === '/admin/applications' ? 'text-amber-400' : 'text-slate-300'
                }`}
              >
                Applications
              </Link>
              <Link
                to="/admin/certificates"
                className={`hover:text-amber-400 transition ${
                  location.pathname === '/admin/certificates' ? 'text-amber-400' : 'text-slate-300'
                }`}
              >
                Certificates
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-slate-800 hover:bg-red-600/90 text-slate-200 hover:text-white px-3 py-1.5 rounded-md transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/admin/login"
              className={`px-3 py-1.5 rounded-md border transition ${
                isAdminRoute
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
              }`}
            >
              Admin Portal
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}