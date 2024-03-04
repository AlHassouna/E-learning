import { backendInstance } from "../api";
import {IUser} from '../api-types'

export const getUser = async (id: string):Promise<IUser> => {
  const response = await backendInstance.get(`/users/${id}`);
  return response.data as IUser;
};


