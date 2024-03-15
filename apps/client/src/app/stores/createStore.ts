import AuthStore from './AuthStore';
import { ContentStore } from './ContentStore';
import MainStore from './MainStore';
import { RootStore } from './RootStore';
import NavbarStore from './NavbarStore';

export interface Stores {
  main: MainStore;
  auth: AuthStore;
  content : ContentStore;

  navbar: NavbarStore;


}

export const createStore = (): RootStore<Stores> => {
  return new RootStore<Stores>({
    main: new MainStore(),
    auth: new AuthStore(),
    content : new ContentStore(),
    navbar: new NavbarStore()
  });
};
