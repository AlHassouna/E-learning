import AuthStore from './AuthStore';
import MainStore from './MainStore';
import ProfileStore from './ProfileStore';
import { RootStore } from './RootStore';
import { Addquiz } from './addQuizStore';
export interface Stores {
  main: MainStore;
  auth: AuthStore;
  profile:ProfileStore;
  addquiz: Addquiz;

}

export const createStore = (): RootStore<Stores> => {
  return new RootStore<Stores>({
    main: new MainStore(),
    auth: new AuthStore(),
    profile:new ProfileStore(),
    addquiz: new Addquiz(),
  });
};
