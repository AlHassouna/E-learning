import { backendInstance } from '../api';
import { IContent } from '../api-types';

export const getContentByCourse = async (courseTitle: string): Promise<IContent> => {
  const response = await backendInstance.get(`/content/${courseTitle}`);
  return response.data;
};