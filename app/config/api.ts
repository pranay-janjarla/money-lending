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
    uptrend: {
      get: () => fetch(`${API_URL}/loans/uptrend`),
    },
  },
};
