import React from 'react';
import { observer } from 'mobx-react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { StoreProvider, useStore } from './stores/setupContext';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';

const App: React.FC = () => {
  const { auth } = useStore();
  const { isAuthenticated } = auth;
  return (
    <>
      <StoreProvider>
        {isAuthenticated && <Navbar />}
        <Routes>
          {routes.map((route) => (
            <Route key={route.key} element={route.component} path={route.linksTo} />
          ))}
        </Routes>
      </StoreProvider>
    </>
  );
};

export default observer(App);
