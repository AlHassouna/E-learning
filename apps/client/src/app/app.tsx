import React from 'react';
import { observer } from 'mobx-react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { StoreProvider } from './stores/setupContext';
import './App.css';


const App: React.FC = () => {
  return (
    <>
      <StoreProvider>
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
