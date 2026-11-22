import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle } from 'lucide-react';
import { useCredVault } from '../context/CredVaultContext';

export default function AdminLogin() {
  const { loginAdmin } = useCredVault();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    const isValid = loginAdmin(username.trim(), password);
    if (isValid) {
      navigate('/admin/applications');
    } else {
      setError('Invalid credentials. Use username "admin" and password "admin".');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center mb-4">
          <Lock className="w-6 h-6" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-1">Admin Login</h1>
        <p className="text-sm text-slate-500 mb-6">
          Sign in to manage certificate applications and issued records.
        </p>

        {error && (
          <div className="mb-5 flex items-center gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-xs text-center text-slate-400">
          Demo credentials: <code className="text-slate-600 font-semibold">admin</code> /{' '}
          <code className="text-slate-600 font-semibold">admin</code>
        </p>
      </div>
    </div>
  );
}