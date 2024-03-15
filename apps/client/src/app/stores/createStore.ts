import AuthStore from './AuthStore';
import { ContentStore } from './ContentStore';
import MainStore from './MainStore';
import { RootStore } from './RootStore';

export interface Stores {
  main: MainStore;
  auth: AuthStore;
  content : ContentStore;

}

export const createStore = (): RootStore<Stores> => {
  return new RootStore<Stores>({
    main: new MainStore(),
    auth: new AuthStore(),
    content : new ContentStore()
  });
};
