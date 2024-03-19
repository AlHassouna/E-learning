import { Route } from '../types';
import { ErrorPage, AuthPage, HomePage, ProfilePage, Admin,QuizAdd, DeleteQuiz, AllDQuizzes } from '../pages/';

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
  },{
    key: 'profile',
    text: 'Profile',
    exact: true,
    linksTo: 'profile/:username',
    showOnMenu: true,
    component: <ProfilePage />
  },
  {
    key: 'error',
    text: 'Error Page',
    exact: true,
    linksTo: '404',
    showOnMenu: true,
    component: <ErrorPage />
  },
  {
    key: 'addquiz',
    text: 'Add Quiz Page',
    exact: true,
    linksTo: 'addquiz/:courseTitle',
    showOnMenu: true,
    component: <QuizAdd />
  },
  {
    key: 'deletequiz',
    text: 'Add Quiz Page',
    exact: true,
    linksTo: 'deletequiz/:courseTitle/:quizId',
    showOnMenu: true,
    component: <DeleteQuiz />
  },
  {
    key: 'deletequiz',
    text: 'Add Quiz Page',
    exact: true,
    linksTo: 'deletequiz/:courseTitle',
    showOnMenu: true,
    component: <AllDQuizzes />
  },
  {
    key: 'teacher',
    text: 'Teacher page',
    exact: true,
    linksTo: 'quizzes/:courseId',
    showOnMenu: true,
    component: <Admin />
  }
];
