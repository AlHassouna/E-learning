import { backendInstance } from '../api';
import { ICourse } from '../api-types';

export const addParticipant = async (courseId: string, participantId: string): Promise<ICourse> => {
  const response = await backendInstance.post(`/courses/${courseId}/participants/${participantId}`);
  return response.data;
};
