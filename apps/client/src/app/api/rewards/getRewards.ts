import { backendInstance } from '../api';
import { IReward } from '../api-types';

export const getRewards = async (): Promise<IReward[]> => {
  const response = await backendInstance.get(`/reward`);
  return response.data;
};
