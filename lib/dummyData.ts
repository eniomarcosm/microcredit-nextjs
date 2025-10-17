// lib/dummyData.ts
// Note: Renamed from dummyData.ts for consistency. Extended with missing fields, documents, and helper functions.
// Adjusted interfaces and data to match component usage.

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
  phone: string;
  address: string;
  documentStatus: 'verified' | 'pending' | 'rejected';
  active: boolean;
}

export const users: User[] = [
  { id: 1, name: "Rodson Fernandes", email: "rodson@example.com", role: "USER", createdAt: "2023-02-15T08:00:00Z", updatedAt: "2023-03-20T12:00:00Z", verified: true, phone: "+258123456789", address: "Maputo, Mozambique", documentStatus: "verified", active: true },
  { id: 2, name: "Ana Silva", email: "ana@example.com", role: "USER", createdAt: "2023-05-10T09:00:00Z", updatedAt: "2023-06-05T14:00:00Z", verified: true, phone: "+258987654321", address: "Beira, Mozambique", documentStatus: "pending", active: true },
  { id: 3, name: "João Costa", email: "joao@example.com", role: "USER", createdAt: "2023-07-21T07:30:00Z", updatedAt: "2023-08-22T11:45:00Z", verified: false, phone: "+258112233445", address: "Nampula, Mozambique", documentStatus: "rejected", active: false },
  { id: 4, name: "Maria Fernandes", email: "maria@example.com", role: "USER", createdAt: "2023-09-12T10:00:00Z", updatedAt: "2023-10-01T12:15:00Z", verified: true, phone: "+258556677889", address: "Maputo, Mozambique", documentStatus: "verified", active: true },
  { id: 5, name: "Pedro Santos", email: "pedro@example.com", role: "USER", createdAt: "2024-01-08T08:30:00Z", updatedAt: "2024-02-12T13:00:00Z", verified: false, phone: "+258990011223", address: "Beira, Mozambique", documentStatus: "pending", active: true },
  // ... (add similar extensions for all users, varying status and active for realism)
  { id: 6, name: "Clara Ribeiro", email: "clara@example.com", role: "USER", createdAt: "2024-03-17T09:15:00Z", updatedAt: "2024-04-21T10:45:00Z", verified: true, phone: "+258334455667", address: "Nampula, Mozambique", documentStatus: "verified", active: true },
  { id: 7, name: "Carlos Silva", email: "carlos@example.com", role: "USER", createdAt: "2024-05-22T08:50:00Z", updatedAt: "2024-06-15T12:30:00Z", verified: true, phone: "+258778899001", address: "Maputo, Mozambique", documentStatus: "pending", active: false },
  { id: 8, name: "Luisa Gomes", email: "luisa@example.com", role: "USER", createdAt: "2024-07-19T07:40:00Z", updatedAt: "2024-08-23T11:10:00Z", verified: false, phone: "+258223344556", address: "Beira, Mozambique", documentStatus: "rejected", active: true },
  { id: 9, name: "Miguel Alves", email: "miguel@example.com", role: "USER", createdAt: "2024-09-05T08:10:00Z", updatedAt: "2024-10-10T13:20:00Z", verified: true, phone: "+258667788990", address: "Nampula, Mozambique", documentStatus: "verified", active: true },
  { id: 10, name: "Sofia Costa", email: "sofia@example.com", role: "USER", createdAt: "2024-11-15T09:05:00Z", updatedAt: "2024-12-18T14:15:00Z", verified: true, phone: "+258001122334", address: "Maputo, Mozambique", documentStatus: "pending", active: true },
  { id: 11, name: "Ricardo Lima", email: "ricardo@example.com", role: "USER", createdAt: "2025-01-03T08:20:00Z", updatedAt: "2025-02-10T12:10:00Z", verified: false, phone: "+258445566778", address: "Beira, Mozambique", documentStatus: "rejected", active: false },
  { id: 12, name: "Patricia Sousa", email: "patricia@example.com", role: "USER", createdAt: "2025-03-11T09:25:00Z", updatedAt: "2025-04-15T13:05:00Z", verified: true, phone: "+258889900112", address: "Nampula, Mozambique", documentStatus: "verified", active: true },
  { id: 13, name: "Bruno Martins", email: "bruno@example.com", role: "USER", createdAt: "2025-05-27T07:55:00Z", updatedAt: "2025-06-30T12:45:00Z", verified: true, phone: "+258334455667", address: "Maputo, Mozambique", documentStatus: "pending", active: true },
  { id: 14, name: "Daniela Correia", email: "daniela@example.com", role: "USER", createdAt: "2025-07-14T08:30:00Z", updatedAt: "2025-08-19T11:35:00Z", verified: false, phone: "+258778899001", address: "Beira, Mozambique", documentStatus: "rejected", active: true },
  { id: 15, name: "Filipe Cardoso", email: "filipe@example.com", role: "USER", createdAt: "2025-09-01T09:15:00Z", updatedAt: "2025-10-04T12:20:00Z", verified: true, phone: "+258223344556", address: "Nampula, Mozambique", documentStatus: "verified", active: false },
  { id: 16, name: "Carla Nunes", email: "carla@example.com", role: "USER", createdAt: "2025-10-10T08:45:00Z", updatedAt: "2025-10-15T13:40:00Z", verified: true, phone: "+258667788990", address: "Maputo, Mozambique", documentStatus: "pending", active: true },
  { id: 17, name: "Eduardo Pinto", email: "eduardo@example.com", role: "USER", createdAt: "2023-04-18T07:30:00Z", updatedAt: "2023-05-20T11:50:00Z", verified: false, phone: "+258001122334", address: "Beira, Mozambique", documentStatus: "rejected", active: true },
  { id: 18, name: "Inês Marques", email: "ines@example.com", role: "USER", createdAt: "2023-06-25T08:20:00Z", updatedAt: "2023-07-30T12:05:00Z", verified: true, phone: "+258445566778", address: "Nampula, Mozambique", documentStatus: "verified", active: true },
  { id: 19, name: "Gonçalo Teixeira", email: "goncalo@example.com", role: "USER", createdAt: "2023-08-09T09:10:00Z", updatedAt: "2023-09-12T13:25:00Z", verified: true, phone: "+258889900112", address: "Maputo, Mozambique", documentStatus: "pending", active: false },
  { id: 20, name: "Helena Faria", email: "helena@example.com", role: "USER", createdAt: "2023-10-21T07:45:00Z", updatedAt: "2023-11-25T11:35:00Z", verified: false, phone: "+258334455667", address: "Beira, Mozambique", documentStatus: "rejected", active: true },
];

export interface Loan {
  id: number;
  userId: number;
  amount: number;
  interestRate: number;
  term: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid' | 'overdue';
  requestedAt: string;
  updatedAt: string;
}

export const loans: Loan[] = [
  { id: 1, userId: 1, amount: 5000, interestRate: 1.5, term: 6, status: "approved", requestedAt: "2023-02-20T09:00:00Z", updatedAt: "2023-02-25T12:00:00Z" },
  { id: 2, userId: 2, amount: 3000, interestRate: 2.0, term: 3, status: "pending", requestedAt: "2023-05-12T09:15:00Z", updatedAt: "2023-05-13T10:00:00Z" },
  { id: 3, userId: 3, amount: 7000, interestRate: 1.2, term: 12, status: "rejected", requestedAt: "2023-07-25T09:45:00Z", updatedAt: "2023-07-26T11:00:00Z" },
  { id: 4, userId: 4, amount: 4500, interestRate: 1.8, term: 6, status: "approved", requestedAt: "2023-09-15T09:30:00Z", updatedAt: "2023-09-16T12:30:00Z" },
  { id: 5, userId: 5, amount: 6000, interestRate: 1.5, term: 12, status: "pending", requestedAt: "2024-01-10T10:00:00Z", updatedAt: "2024-01-11T11:30:00Z" },
  { id: 6, userId: 6, amount: 3500, interestRate: 2.0, term: 3, status: "paid", requestedAt: "2024-03-18T09:10:00Z", updatedAt: "2024-03-20T12:00:00Z" },
  { id: 7, userId: 7, amount: 8000, interestRate: 1.2, term: 12, status: "approved", requestedAt: "2024-05-23T09:50:00Z", updatedAt: "2024-05-25T13:00:00Z" },
  { id: 8, userId: 8, amount: 2000, interestRate: 1.5, term: 6, status: "rejected", requestedAt: "2024-07-21T08:40:00Z", updatedAt: "2024-07-22T11:00:00Z" },
  { id: 9, userId: 9, amount: 5500, interestRate: 2.0, term: 3, status: "paid", requestedAt: "2024-09-08T09:20:00Z", updatedAt: "2024-09-09T12:30:00Z" },
  { id: 10, userId: 10, amount: 4000, interestRate: 1.8, term: 6, status: "approved", requestedAt: "2024-11-16T09:05:00Z", updatedAt: "2024-11-18T12:15:00Z" },
  { id: 11, userId: 11, amount: 7500, interestRate: 1.5, term: 12, status: "pending", requestedAt: "2025-01-05T09:10:00Z", updatedAt: "2025-01-06T11:20:00Z" },
  { id: 12, userId: 12, amount: 3200, interestRate: 2.0, term: 3, status: "paid", requestedAt: "2025-03-12T09:45:00Z", updatedAt: "2025-03-15T12:00:00Z" },
  { id: 13, userId: 13, amount: 6800, interestRate: 1.2, term: 12, status: "rejected", requestedAt: "2025-05-28T09:30:00Z", updatedAt: "2025-05-30T12:10:00Z" },
  { id: 14, userId: 14, amount: 4700, interestRate: 1.8, term: 6, status: "approved", requestedAt: "2025-07-15T09:20:00Z", updatedAt: "2025-07-16T11:50:00Z" },
  { id: 15, userId: 15, amount: 5900, interestRate: 1.5, term: 12, status: "pending", requestedAt: "2025-09-02T09:10:00Z", updatedAt: "2025-09-03T11:20:00Z" },
  { id: 16, userId: 16, amount: 3600, interestRate: 2.0, term: 3, status: "paid", requestedAt: "2025-10-12T09:45:00Z", updatedAt: "2025-10-15T12:30:00Z" },
  { id: 17, userId: 17, amount: 8100, interestRate: 1.2, term: 12, status: "approved", requestedAt: "2023-04-20T09:15:00Z", updatedAt: "2023-04-25T12:40:00Z" },
  { id: 18, userId: 18, amount: 2100, interestRate: 1.5, term: 6, status: "rejected", requestedAt: "2023-06-27T09:30:00Z", updatedAt: "2023-06-28T11:50:00Z" },
  { id: 19, userId: 19, amount: 5600, interestRate: 2.0, term: 3, status: "paid", requestedAt: "2023-08-10T09:40:00Z", updatedAt: "2023-08-12T12:20:00Z" },
  { id: 20, userId: 20, amount: 4100, interestRate: 1.8, term: 6, status: "approved", requestedAt: "2023-10-23T09:50:00Z", updatedAt: "2023-10-25T12:45:00Z" },
];

export interface Document {
  id: number;
  userId: number;
  type: 'id' | 'proof_address' | 'proof_income';
  status: 'approved' | 'pending' | 'rejected';
  uploadedAt: string;
}

export const documents: Document[] = [
  { id: 1, userId: 1, type: 'id', status: 'approved', uploadedAt: '2023-02-16T09:00:00Z' },
  { id: 2, userId: 1, type: 'proof_address', status: 'approved', uploadedAt: '2023-02-17T10:00:00Z' },
  { id: 3, userId: 2, type: 'id', status: 'pending', uploadedAt: '2023-05-11T09:30:00Z' },
  // ... (add more documents for other users as needed, e.g., 2-3 per user with varying statuses)
  { id: 4, userId: 3, type: 'proof_income', status: 'rejected', uploadedAt: '2023-07-22T08:00:00Z' },
  // Continue for completeness
];

export interface Payment {
  id: number;
  loanId: number;
  amount: number;
  method: "M-Pesa" | "eMola" | "Transfer" | "Card";
  status: "PENDING" | "COMPLETED";
  paidAt?: string;
  createdAt: string;
}

export const payments: Payment[] = [
  // ... (original payments, unchanged as not used in this page)
];

export const getLoansByUserId = (userId: number) => loans.filter((loan) => loan.userId === userId);

export const getDocumentsByUserId = (userId: number) => documents.filter((doc) => doc.userId === userId);