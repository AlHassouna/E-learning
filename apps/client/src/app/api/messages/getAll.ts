import { backendInstance } from '../api';
import { IMessage } from '../api-types';

export const getAllMessages = async (
  user1: string,
  user2: string
): Promise<IMessage[]> => {
  const response = await backendInstance.post('/messages', {
    data: {
      user1,
      user2
    }
  });
  return response.data;
};
