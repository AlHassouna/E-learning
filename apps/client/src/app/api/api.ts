import axios from 'axios';

const version = 'v1';
export const backendInstance = axios.create({
  baseURL: `${process.env.REACT_PUBLIC_API_URL}/${version}`,
});
