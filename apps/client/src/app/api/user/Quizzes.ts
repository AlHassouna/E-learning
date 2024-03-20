import { backendInstance } from '../api';


export const addQuiz = async (quiz: any) => {
  const response = await backendInstance.post('/teacher/quizzes', quiz);
  return response.data;
};
export const getQuizzes = async (courseTitle: string) => {
  try {

    const response = await backendInstance.get('/teacher/quizzes/' + courseTitle);
    return response.data;
  } catch (e) {
    console.log('e', e);

  }
};
export const deleteQuiz = async (quizID: string) => {
  const response = await backendInstance.delete('/teacher/quizzes/' + quizID);
  return response.data;
};
