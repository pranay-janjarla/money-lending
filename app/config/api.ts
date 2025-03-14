const API_URL = 'http://localhost:5000/api';

export const api = {
  loans: {
    getAll: () => fetch(`${API_URL}/loans`),
    create: (data: any) =>
      fetch(`${API_URL}/loans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
    summary: {
      get: () => fetch(`${API_URL}/loans/summary`),
    },
  },
};

export type LoanData = {
  name: string;
  amount: number;
  interest: number;
  dueDate: string;
  type: 'given' | 'taken';
  status?: string;
};
