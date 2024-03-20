import React from 'react';
import { useStore } from '../../stores/setupContext';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { LoadingSpin } from '../../core';
import { CenterContainer } from '../../styles';
import { RewardModel } from '../../components/Reward/RewardModel';

export const HomePage: React.FC = observer(() => {
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
            <div>
              <h1>Welcome to the home page</h1>
            </div>
          ) : (
            <Navigate to="/auth" />
          )}
        </>
      )}
    </>
  );
});
