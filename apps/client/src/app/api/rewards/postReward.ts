import { backendInstance } from '../api';
import { IReward } from '../api-types';

export const postReward = async (quizAttempt: IReward): Promise<IReward> => {
  const response = await backendInstance.post('/reward', quizAttempt);
  return response.data;
};
