import { useNavigate } from 'react-router-dom';
import { FilePlus2, SearchCheck, BadgeCheck, Shield } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-100 text-emerald-700 rounded-2xl mb-2">
          <Shield className="w-12 h-12" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          CredVault
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto">
          Certificate Issuing &amp; Verification Platform
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <button
            onClick={() => navigate('/request')}
            className="flex flex-col items-center justify-center gap-3 p-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-sm transition cursor-pointer"
          >
            <FilePlus2 className="w-8 h-8" />
            <span>Request Certificate</span>
          </button>

          <button
            onClick={() => navigate('/track')}
            className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-sm transition cursor-pointer"
          >
            <SearchCheck className="w-8 h-8 text-emerald-400" />
            <span>Track Application</span>
          </button>

          <button
            onClick={() => navigate('/verify')}
            className="flex flex-col items-center justify-center gap-3 p-6 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 hover:border-emerald-500 font-semibold rounded-xl shadow-sm transition cursor-pointer"
          >
            <BadgeCheck className="w-8 h-8 text-emerald-600" />
            <span>Verify Certificate</span>
          </button>
        </div>

        <div className="pt-8 text-xs text-slate-400">
          Sample IDs for testing: Track <code className="text-slate-600 font-semibold">APP-0001</code> &bull; Verify{' '}
          <code className="text-slate-600 font-semibold">CERT-1001</code> or{' '}
          <code className="text-slate-600 font-semibold">CERT-1002</code>
        </div>
      </div>
    </div>
  );
}