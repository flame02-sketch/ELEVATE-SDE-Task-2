import { Navigate } from 'react-router-dom';
import { Ban } from 'lucide-react';
import { useCredVault } from '../context/CredVaultContext';

export default function AdminCertificates() {
  const { certificates, isAdminAuthenticated, revokeCertificate } = useCredVault();

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Certificates</h1>
          <p className="text-sm text-slate-500">
            View all issued certificates and revoke validity if necessary.
          </p>
        </div>
        <span className="text-xs font-medium bg-slate-200 text-slate-700 px-3 py-1 rounded-full self-start">
          Total: {certificates.length}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <th className="py-3.5 px-4">Certificate ID</th>
              <th className="py-3.5 px-4">Name</th>
              <th className="py-3.5 px-4">Phone</th>
              <th className="py-3.5 px-4">City</th>
              <th className="py-3.5 px-4">State</th>
              <th className="py-3.5 px-4">Issued On</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {certificates.map((cert) => (
              <tr key={cert.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">{cert.id}</td>
                <td className="py-3.5 px-4 font-medium text-slate-900">{cert.name}</td>
                <td className="py-3.5 px-4 text-slate-600">{cert.phone}</td>
                <td className="py-3.5 px-4 text-slate-600">{cert.city}</td>
                <td className="py-3.5 px-4 text-slate-600">{cert.state}</td>
                <td className="py-3.5 px-4 text-slate-600">{cert.issuedOn}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      cert.status === 'Valid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {cert.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => revokeCertificate(cert.id)}
                    disabled={cert.status === 'Revoked'}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-red-600 hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400 text-white transition cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}