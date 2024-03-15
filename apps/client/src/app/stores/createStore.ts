import AuthStore from './AuthStore';
import MainStore from './MainStore';
import { RootStore } from './RootStore';
import { QuizStore } from './QuizStore';

export interface Stores {
  main: MainStore;
  auth: AuthStore;
  quiz: QuizStore;

}

export const createStore = (): RootStore<Stores> => {
  return new RootStore<Stores>({
    main: new MainStore(),
    auth: new AuthStore(),
    quiz: new QuizStore()
  });
};
