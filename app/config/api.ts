export const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  loans: {
    getAll: () => fetch(`${API_BASE_URL}/loans`),
    create: (data: any) => fetch(`${API_BASE_URL}/loans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
  },
};