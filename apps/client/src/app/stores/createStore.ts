import AuthStore from './AuthStore';
import MainStore from './MainStore';
import { RootStore } from './RootStore';

export interface Stores {
  main: MainStore;
  auth: AuthStore;

}

export const createStore = (): RootStore<Stores> => {
  return new RootStore<Stores>({
    main: new MainStore(),
    auth: new AuthStore()
  });
};
