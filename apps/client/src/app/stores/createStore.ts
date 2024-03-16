import AuthStore from './AuthStore';
import { ContentStore } from './ContentStore';
import MainStore from './MainStore';
import { RootStore } from './RootStore';
import { QuizStore } from './QuizStore';
import NavbarStore from './NavbarStore';
import RewardStore from './RewardStore';

export interface Stores {
  main: MainStore;
  auth: AuthStore;
  quiz: QuizStore;
  navbar: NavbarStore,
  reward: RewardStore
  content : ContentStore;



}

export const createStore = (): RootStore<Stores> => {
  return new RootStore<Stores>({
    main: new MainStore(),
    auth: new AuthStore(),
    quiz: new QuizStore(),
    navbar: new NavbarStore(),
    reward: new RewardStore(),
    content : new ContentStore(),
  });
};
