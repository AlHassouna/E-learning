import AuthStore from './AuthStore';
import { ContentStore } from './ContentStore';
import MainStore from './MainStore';
import { RootStore } from './RootStore';
import NavbarStore from './NavbarStore';
import RewardStore from './RewardStore';

export interface Stores {
  main: MainStore;
  auth: AuthStore;
  navbar: NavbarStore,
  reward: RewardStore
  content : ContentStore;



}

export const createStore = (): RootStore<Stores> => {
  return new RootStore<Stores>({
    main: new MainStore(),
    auth: new AuthStore(),
    navbar: new NavbarStore(),
    reward: new RewardStore(),
    content : new ContentStore(),
  });
};
