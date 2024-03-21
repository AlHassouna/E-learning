import { Route } from '../types';
import { ErrorPage, ProfilePage, Admin, QuizAdd, DeleteQuiz, AllDQuizzes, AllEQuizzes } from '../pages/';
import { AuthPage, HomePage, QuizPage, ContentPage, ChatPage, EditQuiz } from '../pages/';

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
  }, {
    key: 'profile',
    text: 'Profile',
    exact: true,
    linksTo: 'profile',
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
    text: 'Delete Quiz Page',
    exact: true,
    linksTo: 'deletequiz/:courseTitle/:quizId',
    showOnMenu: true,
    component: <DeleteQuiz />
  },
  {
    key: 'deletequizzes',
    text: 'Delete Quiz Page',
    exact: true,
    linksTo: 'deletequiz/:courseTitle',
    showOnMenu: true,
    component: <AllDQuizzes />
  },
  {
    key: 'editquiz',
    text: 'Edit Quiz Page',
    exact: true,
    linksTo: 'editquiz/:courseTitle/:quizId',
    showOnMenu: true,
    component: < EditQuiz />
  },
  {
    key: 'editquizzes',
    text: 'Edit Quiz Page',
    exact: true,
    linksTo: 'editquiz/:courseTitle',
    showOnMenu: true,
    component: <AllEQuizzes />
  },
  {
    key: 'teacher',
    text: 'Teacher page',
    exact: true,
    linksTo: 'quizzes/:courseId',
    showOnMenu: true,
    component: <Admin />
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
    component: <ContentPage />
  }
  , {
    key: 'chat',
    text: 'ChatPage',
    exact: true,
    linksTo: '/chat',
    showOnMenu: true,
    component: <ChatPage />
  }
];
