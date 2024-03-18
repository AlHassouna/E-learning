import { backendInstance } from '../api';
import { ICourse } from '../api-types';

export const getCoursesBySearch = async (search: string): Promise<ICourse[]> => {
  const response = await backendInstance.post(`/courses/search/${search}`);
  return response.data;
};
