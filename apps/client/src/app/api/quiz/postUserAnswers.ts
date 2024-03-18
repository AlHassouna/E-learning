import axios from 'axios';

export const submitQuiz = async (quizId: string, userId: string, questionAttempts: any[]) => {
  const response = await axios.post('http://localhost:8000/api/v1/quizzes/submit', {
    quizId,
    userId,
    questionAttempts
  });
  return response.data;
};
