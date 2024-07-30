import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const fetcher = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  withCredentials: false,
  headers: {
    'Content-type': 'application/json',
  },
});
