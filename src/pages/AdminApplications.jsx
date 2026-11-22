import { Navigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useCredVault } from '../context/CredVaultContext';

export default function AdminApplications() {
  const {
    applications,
    isAdminAuthenticated,
    issueCertificate,
    rejectApplication
  } = useCredVault();

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-amber-100 text-amber-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Applications</h1>
          <p className="text-sm text-slate-500">
            Review citizen requests and issue or reject certificates.
          </p>
        </div>
        <span className="text-xs font-medium bg-slate-200 text-slate-700 px-3 py-1 rounded-full self-start">
          Total: {applications.length}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <th className="py-3.5 px-4">Application ID</th>
              <th className="py-3.5 px-4">Name</th>
              <th className="py-3.5 px-4">Phone</th>
              <th className="py-3.5 px-4">Gender</th>
              <th className="py-3.5 px-4">City</th>
              <th className="py-3.5 px-4">State</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">{app.id}</td>
                <td className="py-3.5 px-4 font-medium text-slate-900">{app.name}</td>
                <td className="py-3.5 px-4 text-slate-600">{app.phone}</td>
                <td className="py-3.5 px-4 text-slate-600">{app.gender}</td>
                <td className="py-3.5 px-4 text-slate-600">{app.city}</td>
                <td className="py-3.5 px-4 text-slate-600">{app.state}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusStyle(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => issueCertificate(app.id)}
                      disabled={app.status === 'Approved'}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white transition cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Issue
                    </button>
                    <button
                      onClick={() => rejectApplication(app.id)}
                      disabled={app.status === 'Rejected' || app.status === 'Approved'}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-red-600 hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400 text-white transition cursor-pointer disabled:cursor-not-allowed"
                    >
                      <X className="w-3.5 h-3.5" />
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}