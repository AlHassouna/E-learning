import { Route } from '../types';
import { AuthPage, HomePage, QuizPage, ContentPage} from '../pages/';

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
    key: 'quiz',
    text: 'QuizPage',
    exact: true,
    linksTo: '/quiz',
    showOnMenu: true,
    component: <QuizPage />
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
