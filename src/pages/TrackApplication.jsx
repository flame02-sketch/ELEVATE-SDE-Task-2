import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { useCredVault } from '../context/CredVaultContext';

export default function TrackApplication() {
  const { applications } = useCredVault();
  const [appIdInput, setAppIdInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    setResult(null);
    setError('');

    const cleanedId = appIdInput.trim().replace(/^#/, '').toUpperCase();
    if (!cleanedId) {
      setError('Please enter an Application ID.');
      return;
    }

    const found = applications.find((app) => app.id.toUpperCase() === cleanedId);
    if (found) {
      setResult(found);
    } else {
      setError(`Application ID "${appIdInput.trim()}" does not exist.`);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Track Application</h1>
        <p className="text-sm text-slate-500 mb-6">
          Enter your Application ID (e.g., APP-0001) to check its current status.
        </p>

        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={appIdInput}
            onChange={(e) => setAppIdInput(e.target.value)}
            placeholder="Application ID (e.g., APP-0001)"
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Track</span>
          </button>
        </form>

        {error && (
          <div className="mt-6 flex items-center gap-2.5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Application Details
              </span>
              <span className="font-mono text-sm font-bold text-slate-700">#{result.id}</span>
            </div>

            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <span className="text-slate-500">Name:</span>
              <span className="font-semibold text-slate-900 text-right">{result.name}</span>

              <span className="text-slate-500">Status:</span>
              <div className="text-right">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                    result.status
                  )}`}
                >
                  {result.status}
                </span>
              </div>

              <span className="text-slate-500">Submission Date:</span>
              <span className="font-medium text-slate-900 text-right">{result.submissionDate}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}