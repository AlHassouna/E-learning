import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/setupContext';
import Quiz from '../../components/Quiz/Quiz';
import { Navigate, useLocation } from 'react-router-dom';
import { CenterContainer } from '../../styles';
import { LoadingSpin } from '../../core';
import { QuizType } from '../../types';

export const QuizPage: React.FC = observer(() => {
  const { quiz, navbar, main, auth } = useStore();
  const { courseId, chosenCourse } = navbar;
  const { currentQuiz, setCurrentQuiz, isLoading, setIsLoading } = quiz;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const difficulty = params.get('difficulty') || '';
  const { isAuthenticated } = auth;

  useEffect(() => {
    const fetchQ = async () => {
      if (chosenCourse && chosenCourse !== '0') {
        setIsLoading(true);
        setCurrentQuiz({} as QuizType);
        await quiz.fetchQuizzes(chosenCourse, difficulty, courseId);
      }
    };
    fetchQ();
  }, [courseId, difficulty]);
  return (
    <>
      {isAuthenticated ? (
        isLoading ? (
          <CenterContainer>
            <LoadingSpin />
          </CenterContainer>
        ) :
          <Quiz quiz={currentQuiz} course={courseId} />

      ) : (
        <Navigate to="/auth" />
      )}
    </>
  );
});

export default QuizPage;
