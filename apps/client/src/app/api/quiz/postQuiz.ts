import { backendInstance } from '../api';

export const postQuiz = async (categoryId: string, difficultyId: string, courseId: string) => {
  const response = await backendInstance.post(`/quizzes/${categoryId}/${difficultyId}`, {
    courseId
  });
  return response.data;
};
