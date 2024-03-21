import AuthStore from './AuthStore';
import { ContentStore } from './ContentStore';
import MainStore from './MainStore';
import ProfileStore from './ProfileStore';
import { RootStore } from './RootStore';
import { Addquiz } from './addQuizStore';
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
  profile:ProfileStore;
  addquiz: Addquiz;



}

export const createStore = (): RootStore<Stores> => {
  return new RootStore<Stores>({
    main: new MainStore(),
    auth: new AuthStore(),
    profile:new ProfileStore(),
    addquiz: new Addquiz(),
    quiz: new QuizStore(),
    navbar: new NavbarStore(),
    reward: new RewardStore(),
    content : new ContentStore(),
  });
};
