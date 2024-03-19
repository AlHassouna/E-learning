import React from 'react';
import { observer } from 'mobx-react';
import {AddQuizForm} from '../../components/TeacherForm/QuizzAdd';
import { useStore } from '../../stores/setupContext';
import { Navigate } from 'react-router-dom';
import { DeleteQuizForm } from '../../components/TeacherForm/DeleteQuiz';

export const DeleteQuiz: React.FC = observer(() => {
  
  const { auth, addquiz } = useStore();
  const { isAuthenticated, logout } = auth;
  const {addQuiz}= addquiz
  const quiz =  {
    "quizTitle": "sdds",
    "duration": 3,
    "category": "sddds",
    "level": "easy",
    "questions": [
      {
        "questionText": "dcsdsdc",
        "type": "multiple",
        "options": [
          "sd",
          "vdd",
          "tew"
        ],
        "correctOption": "teweed"
      }
    ]
  }
  const handleDeleteQuiz = () => {
    console.log("Quiz was Deleted")

  };
  return (
    <>   
      {!isAuthenticated && <Navigate to="/auth" />}
      <DeleteQuizForm handleDeleteQuiz={handleDeleteQuiz} quiz={quiz} />
    </>
  );
});

export default DeleteQuiz;
