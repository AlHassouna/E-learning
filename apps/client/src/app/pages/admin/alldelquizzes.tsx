import React from 'react';
import { observer } from 'mobx-react';
import QuizzesManage from '../../components/TeacherForm/Quizzes';
import { useStore } from '../../stores/setupContext';
import { Navigate } from 'react-router-dom';
import AllDelQuizzes from '../../components/TeacherForm/AllDelQuizzes';


export const AllDQuizzes: React.FC = observer(() => {

  const { profile, main, auth } = useStore();
  const { isAuthenticated, logout } = auth;

  return (
    <>
      {!isAuthenticated && <Navigate to="/auth" />}
      <AllDelQuizzes/>
    </>
  );
});
export default AllDQuizzes;

