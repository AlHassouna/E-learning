import React from 'react';
import { observer } from 'mobx-react';
import QuizzesManage from '../../components/TeacherForm/Quizzes';
import { useStore } from '../../stores/setupContext';
import { Navigate } from 'react-router-dom';
import AllEdQuizzes from '../../components/TeacherForm/AllEdQuizzes';


export const AllEQuizzes: React.FC = observer(() => {

  const { profile, main, auth } = useStore();
  const { isAuthenticated, logout } = auth;

  return (
    <>
      {!isAuthenticated && <Navigate to="/auth" />}
      <AllEdQuizzes/>
    </>
  );
});
export default AllEQuizzes;

