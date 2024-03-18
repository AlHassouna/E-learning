import { backendInstance } from '../api';
import { ICourse } from '../api-types';

export const getAllCourses = async (): Promise<ICourse[]> => {
  const response = await backendInstance.get('/courses');
  return response.data;
};
