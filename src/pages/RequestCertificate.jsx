import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { INDIAN_STATES } from '../data/mockData';
import { useCredVault } from '../context/CredVaultContext';

export default function RequestCertificate() {
  const { addApplication } = useCredVault();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    city: '',
    state: ''
  });

  const [error, setError] = useState('');
  const [submittedId, setSubmittedId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.gender ||
      !formData.city.trim() ||
      !formData.state
    ) {
      setError('Please fill in all required fields before submitting.');
      return;
    }

    const generatedId = addApplication({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      gender: formData.gender,
      city: formData.city.trim(),
      state: formData.state
    });

    setSubmittedId(generatedId);
    setFormData({ name: '', phone: '', gender: '', city: '', state: '' });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Request Certificate</h1>
        <p className="text-sm text-slate-500 mb-6">
          Fill out your details below to apply for a digital certificate.
        </p>

        {error && (
          <div className="mb-5 flex items-center gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {submittedId && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
            <div className="flex items-center gap-2 font-semibold text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
              <span>Application submitted successfully!</span>
            </div>
            <p className="text-sm pl-7">
              Application ID: <span className="font-mono font-bold">#{submittedId}</span>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Gender <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-6 pt-1">
              {['Male', 'Female', 'Other'].map((option) => (
                <label key={option} className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={handleChange}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              State <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            >
              <option value="">-- Select State --</option>
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm transition cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}