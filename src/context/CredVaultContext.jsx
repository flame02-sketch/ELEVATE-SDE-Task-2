import { createContext, useContext, useState } from 'react';
import { INITIAL_APPLICATIONS, INITIAL_CERTIFICATES } from '../data/mockData';

const CredVaultContext = createContext();

export function CredVaultProvider({ children }) {
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [certificates, setCertificates] = useState(INITIAL_CERTIFICATES);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Submit new certificate request
  const addApplication = (formData) => {
    const nextNumber = applications.length + 1;
    const formattedId = `APP-${String(nextNumber).padStart(4, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    const newApp = {
      id: formattedId,
      ...formData,
      status: 'Pending',
      submissionDate: today
    };

    setApplications((prev) => [newApp, ...prev]);
    return formattedId;
  };

  // Admin: Issue certificate for an application
  const issueCertificate = (appId) => {
    const targetApp = applications.find((a) => a.id === appId);
    if (!targetApp) return;

    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: 'Approved' } : app))
    );

    const alreadyIssued = certificates.some((c) => c.applicationId === appId);
    if (!alreadyIssued) {
      const nextCertNum = 1001 + certificates.length;
      const newCert = {
        id: `CERT-${nextCertNum}`,
        applicationId: targetApp.id,
        name: targetApp.name,
        phone: targetApp.phone,
        city: targetApp.city,
        state: targetApp.state,
        issuedOn: new Date().toISOString().split('T')[0],
        status: 'Valid'
      };
      setCertificates((prev) => [newCert, ...prev]);
    }
  };

  // Admin: Reject application
  const rejectApplication = (appId) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: 'Rejected' } : app))
    );
  };

  // Admin: Revoke issued certificate
  const revokeCertificate = (certId) => {
    setCertificates((prev) =>
      prev.map((cert) => (cert.id === certId ? { ...cert, status: 'Revoked' } : cert))
    );
  };

  // Admin Auth
  const loginAdmin = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <CredVaultContext.Provider
      value={{
        applications,
        certificates,
        isAdminAuthenticated,
        addApplication,
        issueCertificate,
        rejectApplication,
        revokeCertificate,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </CredVaultContext.Provider>
  );
}

export const useCredVault = () => useContext(CredVaultContext);