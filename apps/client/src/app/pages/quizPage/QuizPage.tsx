import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/setupContext';
import Quiz from '../../components/Quiz/Quiz';
import { useParams } from 'react-router-dom';

export const QuizPage: React.FC = observer(() => {
  const { quiz } = useStore();
//   const { categoryId } = useParams<{ categoryId?: string }>();

//   useEffect(() => {
//     if (categoryId) {
//       quiz.fetchQuizzes(parseInt(categoryId));
//     }
//   }, [quiz, categoryId]);

  const id = 10;
  const difficulty = 'medium'

  useEffect(() => {
    console.log("In page",new Date().toLocaleDateString())
    quiz.fetchQuizzes(id, difficulty);
  }, []);

  
  return (
    <div>
      {quiz.quizzes.map(q => { 
        console.log(q)
       return <Quiz key={q._id} quiz={q} />
      })}
    </div>
  );
});

export default QuizPage;
