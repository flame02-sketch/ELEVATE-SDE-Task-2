# CredVault — Certificate Issuing & Verification Platform

Frontend prototype built for the **ELEVATE SDE Internship** using React, Vite, React Router, and Tailwind CSS.

## Features Implemented
- **Home Page (`/`)**: Platform overview with direct navigation to Request, Track, and Verify flows.
- **Request Certificate (`/request`)**: Form with empty-field validation, Indian states dropdown, and instant Application ID generation.
- **Track Application (`/track`)**: Look up application status (`Pending`, `Approved`, `Rejected`) by Application ID.
- **Verify Certificate (`/verify`)**: Public certificate authenticity checker (`Valid`, `Revoked`, `Not Found`).
- **Admin Login (`/admin/login`)**: Authenticated admin portal (`admin` / `admin`).
- **Admin Applications (`/admin/applications`)**: Manage citizen requests with `Issue` and `Reject` actions.
- **Admin Certificates (`/admin/certificates`)**: View issued certificates and `Revoke` validity.
