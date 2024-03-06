import { Route } from '../types';
import { AuthPage, HomePage } from '../pages/';

export const routes: Route[] = [
  {
    key: 'login',
    text: 'AuthForm',
    exact: true,
    linksTo: 'auth',
    showOnMenu: true,
    component: <AuthPage />
  },
  {
    key: 'home',
    text: 'HomePage',
    exact: true,
    linksTo: '/',
    showOnMenu: true,
    component: <HomePage />
  }
];
