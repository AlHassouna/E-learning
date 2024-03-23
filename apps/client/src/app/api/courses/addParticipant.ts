import { backendInstance } from '../api';
import { ICourse } from '../api-types';

export const addParticipant = async (courseId: string, participantId: string): Promise<ICourse> => {
  console.log('courseId: ', courseId);
  console.log('userId: ', participantId);
  const response = await backendInstance.post(`/courses/${courseId}/participants/${participantId}`);
  return response.data;
};

export const removeParticipant = async (courseId: string, participantId: string): Promise<ICourse> => {
  const response = await backendInstance.delete(`/courses/${courseId}/participants/${participantId}`);
  return response.data;
};
