import { Route } from '../types';
import { AuthPage, HomePage, ContentPage } from '../pages/';

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
  },
  {
    key: 'content',
    text: 'ContentPage',
    exact: true,
    linksTo: '/courses/:courseTitle',
    showOnMenu: true,
    component: <ContentPage courseTitle="math" />
  }

];
