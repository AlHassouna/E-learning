import React from 'react';
import { observer } from 'mobx-react';
import {AddQuizForm} from '../../components/TeacherForm/QuizzAdd';
import { useStore } from '../../stores/setupContext';
import { Navigate } from 'react-router-dom';
import { Addquiz } from '../../stores/addQuizStore';
import { message } from 'antd';

export const  QuizAdd: React.FC = observer(() => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'The quiz was successfully added',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Failed to add the quiz',
    });
  };
  
  const { auth, addquiz } = useStore();
  const { isAuthenticated, logout } = auth;
  const {addQuiz}= addquiz
  const handleSaveQuiz = (quiz: Addquiz) => {
    console.log("Quiz was saved")
    addQuiz(quiz)
  };
  return (
    <>   
      {!isAuthenticated && <Navigate to="/auth" />}
      <AddQuizForm onSave={handleSaveQuiz} />
    </>
  );
});

export default QuizAdd;
