import { backendInstance } from '../api';
import { IUser, IProfile } from '../api-types';

export const getUser = async (username: string|undefined): Promise<IProfile> => {
  const response = await backendInstance.get(`/profile/user/${username}`);
  console.log(response.data)
  return response.data;
};

export const setToken = (token: string): void => {
  backendInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const loginAsUser = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await backendInstance.post('/auth/login', payload);
  return response.data;
};

export const logout = async () => {
  const response = await backendInstance.post('/auth/logout');
  return response.data;
};

export const signUp = async (payload: {
  email: string;
  password: string;
  role: string;
}) => {
  const response = await backendInstance.post('/auth/register', payload);
  return response.data;
};
