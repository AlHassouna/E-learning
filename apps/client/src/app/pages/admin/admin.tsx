import React from 'react';
import { observer } from 'mobx-react';
import QuizzesManage from '../../components/TeacherForm/Quizzes';
import { useStore } from '../../stores/setupContext';
import { Navigate } from 'react-router-dom';
import { Addquiz } from '../../stores/addQuizStore';


export const Admin: React.FC = observer(() => {
  const handleSaveQuiz = (quiz: Addquiz) => {
    console.log("Quiz was saved")
  };
  const { profile, main, auth } = useStore();
  const { isAuthenticated, logout } = auth;

  return (
    <>
      {!isAuthenticated && <Navigate to="/auth" />}
      <QuizzesManage/>
    </>
  );
});
export default Admin;

