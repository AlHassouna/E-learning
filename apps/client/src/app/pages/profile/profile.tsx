import React from 'react';
import { useStore } from '../../stores/setupContext';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Profile } from '../../components/ProfileForm/Profile';


export const ProfilePage: React.FC = observer(() => {
  const { profile, main, auth } = useStore();
  const { isLoading } = main;
  const { getUserDetails } = profile
  const { isAuthenticated, logout } = auth;
  return (
    <>
      {!isAuthenticated && <Navigate to="/auth" />}
      <Profile isLoading={isLoading} UserDetails={getUserDetails}></Profile>
    </>
  );
});
