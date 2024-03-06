import axios from 'axios';

const version = 'v1';
export const backendInstance = axios.create({
  baseURL: `http://localhost:8000/api/${version}`
});
