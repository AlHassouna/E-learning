import React from 'react';
import { useStore } from '../../stores/setupContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';


export const HomePage: React.FC = observer(() => {
  const { auth } = useStore();
  const { isAuthenticated, logout } = auth;
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate ('/chat');
  };
  return (
    <>
      {!isAuthenticated && <Navigate to="/auth" />}
      <h1>Homepage</h1>
      <button onClick={logout}>Logout</button>
      <div onClick={handleChatClick}>
        chat
      </div>
      
    </>
  );
});
