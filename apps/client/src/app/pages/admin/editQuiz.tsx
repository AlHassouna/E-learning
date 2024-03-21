import React from 'react';
import { observer } from 'mobx-react';
import {AddQuizForm} from '../../components/TeacherForm/QuizzAdd';
import { useStore } from '../../stores/setupContext';
import { Navigate } from 'react-router-dom';
import { EditQuizForm } from '../../components/TeacherForm/QuizzEdit';
import { updateQuiz } from '../../api';
import { message } from 'antd';

export const EditQuiz: React.FC = observer(() => {
  const [messageApi, contextHolder] = message.useMessage();
  
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'The quiz was successfully edited',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Failed to edit the quiz',
    });
  };
  const editQuiz = async (quiz: any)=>{
    try{
      console.log("edit quiz", quiz)
    await updateQuiz(quiz)
    success()

    }
    catch(err){
      console.log("failed to update quiz", quiz)
      error()
    }
  }
  
  const { auth, addquiz } = useStore();
  const { isAuthenticated, logout } = auth;
  
  return (
    <>   

      {!isAuthenticated && <Navigate to="/auth" />}
      {contextHolder}
      <EditQuizForm onSave={editQuiz} />
    </>
  );
});

export default EditQuiz;
