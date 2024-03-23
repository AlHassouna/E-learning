import { backendInstance } from '../api';
import { IContent } from '../api-types';

export const getContentByCourse = async (courseTitle: string): Promise<IContent[]> => {
  const response = await backendInstance.get(`/content/${courseTitle}`);
  return response.data;
};

export const addContent = async (content:any):Promise<any>=>{
  const response = await backendInstance.post(`/content`, content);
  return response.data;
}