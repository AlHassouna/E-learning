import axios from 'axios';

const version = 'v1';
export const backendInstance = axios.create({
  baseURL: `https://e-learning-back-ufeg.onrender.com/api/${version}`
});
