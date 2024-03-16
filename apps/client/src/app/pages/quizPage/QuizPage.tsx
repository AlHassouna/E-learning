import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/setupContext';
import Quiz from '../../components/Quiz/Quiz';
import { useLocation } from 'react-router-dom';
import { stringify } from 'querystring';

export const QuizPage: React.FC = observer(() => {
  const { quiz } = useStore();
  
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const difficulty = params.get('difficulty') || '';
  const categoryId = params.get('category') || '0'; 

  useEffect(() => {
    if (categoryId && categoryId !== '0') {
      quiz.fetchQuizzes(parseInt(categoryId), difficulty);
    }
  }, [categoryId, difficulty]);

  return (
    <div>
      {quiz.quizzes.map(q => (
        <Quiz key={q._id} quiz={q} course={categoryId}/>
      ))}
    </div>
  );
});

export default QuizPage;
