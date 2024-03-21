import React from 'react';
import { observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';
import { UserPass, UserSign } from '../../stores/types';
import { Auth } from '../../components/AuthForm/Auth';
import { useStore } from '../../stores/setupContext';
import Image from '../../../assets/garden.jpg';
import {
  FlexContainer,
  StyledCard,
  StyledCardBody,
  StyledImageContainer,
  StyledImage, CenterContainer
} from '../../styles';
import { LoadingSpin } from '../../core';

export const AuthPage: React.FC = observer(() => {
  const { auth, main } = useStore();
  const { isLoading } = main;
  const { login, isAuthenticated, signup, isLoadingResponse } = auth;
  return (
    <>
      {isLoading ? (
        <CenterContainer>
          <LoadingSpin />
        </CenterContainer>
      ) : (
        <>
          {isAuthenticated ? (
            <Navigate to="/" />
          ) : (
            <FlexContainer>
              <StyledCard>
                <StyledCardBody>
                  <StyledImageContainer>
                    <StyledImage src={Image} alt="garden" />
                  </StyledImageContainer>
                  <Auth isLoadingResponse={isLoadingResponse} signupF={(payload: UserSign) => signup(payload)}
                        login={(payload: UserPass) => login(payload)} />
                </StyledCardBody>
              </StyledCard>
            </FlexContainer>
          )}
        </>
      )}
    </>
  );
});

export default AuthPage;
