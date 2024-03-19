import { CenterContainer } from '../../styles';
import { LoadingSpin } from '../../core';
import { Navigate } from 'react-router-dom';
import React from 'react';
import { useStore } from '../../stores/setupContext';
import { Chat } from '../../components/Chat/Chat';

export const ChatPage: React.FC = () => {
  const { auth, main } = useStore();
  const { isLoading } = main;
  const { isAuthenticated } = auth;
  return (
    <>
      {isLoading ? (
        <CenterContainer>
          <LoadingSpin />
        </CenterContainer>
      ) : (
        <>
          {isAuthenticated ? (
            <Chat />
          ) : (
            <Navigate to="/auth" />
          )}
        </>
      )}
    </>
  );
};
