import React from 'react';
import { observer } from 'mobx-react';
import {AddQuizForm} from '../../components/TeacherForm/QuizzAdd';
import { useStore } from '../../stores/setupContext';
import { Navigate } from 'react-router-dom';
import { DeleteQuizForm } from '../../components/TeacherForm/DeleteQuiz';

export const DeleteQuiz: React.FC = observer(() => {
  
  const { auth, addquiz } = useStore();
  const { isAuthenticated, logout } = auth;
  
  return (
    <>   
      {!isAuthenticated && <Navigate to="/auth" />}
      <DeleteQuizForm />
    </>
  );
});

export default DeleteQuiz;
