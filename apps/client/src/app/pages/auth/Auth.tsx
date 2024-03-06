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
  StyledImage
} from '../../styles';

export const AuthPage: React.FC = observer(() => {
  const { auth } = useStore();
  const { login, isAuthenticated, signup, isLoadingResponse } = auth;
  return (
    <>
      {isAuthenticated && <Navigate to="/" />}
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
    </>
  );
});

export default AuthPage;
