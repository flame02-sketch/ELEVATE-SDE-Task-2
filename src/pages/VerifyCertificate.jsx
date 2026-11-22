import { useState } from 'react';
import { BadgeCheck, AlertCircle, ShieldX } from 'lucide-react';
import { useCredVault } from '../context/CredVaultContext';

export default function VerifyCertificate() {
  const { certificates } = useCredVault();
  const [certIdInput, setCertIdInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    setResult(null);
    setError('');

    const cleanedId = certIdInput.trim().replace(/^#/, '').toUpperCase();
    if (!cleanedId) {
      setError('Please enter a Certificate ID.');
      return;
    }

    const found = certificates.find((cert) => cert.id.toUpperCase() === cleanedId);
    if (found) {
      setResult(found);
    } else {
      setError('Not Found: No certificate exists with that Certificate ID.');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Verify Certificate</h1>
        <p className="text-sm text-slate-500 mb-6">
          Enter a Certificate ID (e.g., CERT-1001 or CERT-1002) to verify authenticity.
        </p>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={certIdInput}
            onChange={(e) => setCertIdInput(e.target.value)}
            placeholder="Certificate ID (e.g., CERT-1001)"
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition cursor-pointer"
          >
            <BadgeCheck className="w-4 h-4" />
            <span>Verify</span>
          </button>
        </form>

        {error && (
          <div className="mt-6 flex items-center gap-2.5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div
            className={`mt-6 p-5 rounded-xl border space-y-3 ${
              result.status === 'Valid'
                ? 'bg-emerald-50/60 border-emerald-200'
                : 'bg-red-50/60 border-red-200'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2">
                {result.status === 'Valid' ? (
                  <BadgeCheck className="w-5 h-5 text-emerald-600" />
                ) : (
                  <ShieldX className="w-5 h-5 text-red-600" />
                )}
                <span className="font-mono text-sm font-bold text-slate-800">{result.id}</span>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  result.status === 'Valid'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-red-100 text-red-800 border-red-300'
                }`}
              >
                {result.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <span className="text-slate-500">Name:</span>
              <span className="font-semibold text-slate-900 text-right">{result.name}</span>

              <span className="text-slate-500">Phone:</span>
              <span className="font-medium text-slate-900 text-right">{result.phone}</span>

              <span className="text-slate-500">Issued on Date:</span>
              <span className="font-medium text-slate-900 text-right">{result.issuedOn}</span>

              <span className="text-slate-500">Status:</span>
              <span
                className={`font-bold text-right ${
                  result.status === 'Valid' ? 'text-emerald-700' : 'text-red-700'
                }`}
              >
                {result.status}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}