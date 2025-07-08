import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // ou sua URL real
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Intercepta erros globais, se quiser
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na API:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
