import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CredVaultProvider } from './context/CredVaultContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RequestCertificate from './pages/RequestCertificate';
import TrackApplication from './pages/TrackApplication';
import VerifyCertificate from './pages/VerifyCertificate';
import AdminLogin from './pages/AdminLogin';
import AdminApplications from './pages/AdminApplications';
import AdminCertificates from './pages/AdminCertificates';

export default function App() {
  return (
    <CredVaultProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/request" element={<RequestCertificate />} />
              <Route path="/track" element={<TrackApplication />} />
              <Route path="/verify" element={<VerifyCertificate />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/applications" element={<AdminApplications />} />
              <Route path="/admin/certificates" element={<AdminCertificates />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CredVaultProvider>
  );
}