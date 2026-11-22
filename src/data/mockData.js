export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
];

export const INITIAL_APPLICATIONS = [
  {
    id: "APP-0001",
    name: "Aarav Sharma",
    phone: "9876543210",
    gender: "Male",
    city: "Pune",
    state: "Maharashtra",
    status: "Approved",
    submissionDate: "2026-11-15"
  },
  {
    id: "APP-0002",
    name: "Priya Nair",
    phone: "9123456780",
    gender: "Female",
    city: "Bengaluru",
    state: "Karnataka",
    status: "Pending",
    submissionDate: "2026-11-18"
  },
  {
    id: "APP-0003",
    name: "Rohan Verma",
    phone: "9988776655",
    gender: "Male",
    city: "Jaipur",
    state: "Rajasthan",
    status: "Rejected",
    submissionDate: "2026-11-19"
  },
  {
    id: "APP-0004",
    name: "Ananya Iyer",
    phone: "9012345678",
    gender: "Female",
    city: "Chennai",
    state: "Tamil Nadu",
    status: "Pending",
    submissionDate: "2026-11-21"
  }
];

export const INITIAL_CERTIFICATES = [
  {
    id: "CERT-1001",
    applicationId: "APP-0001",
    name: "Aarav Sharma",
    phone: "9876543210",
    city: "Pune",
    state: "Maharashtra",
    issuedOn: "2026-11-16",
    status: "Valid"
  },
  {
    id: "CERT-1002",
    applicationId: "APP-0000",
    name: "Vikram Desai",
    phone: "9822011223",
    city: "Ahmedabad",
    state: "Gujarat",
    issuedOn: "2026-10-10",
    status: "Revoked"
  }
];