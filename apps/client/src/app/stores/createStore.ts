import AuthStore from './AuthStore';
import MainStore from './MainStore';
import { RootStore } from './RootStore';
import NavbarStore from './NavbarStore';

export interface Stores {
  main: MainStore;
  auth: AuthStore;
  navbar: NavbarStore,

}

export const createStore = (): RootStore<Stores> => {
  return new RootStore<Stores>({
    main: new MainStore(),
    auth: new AuthStore(),
    navbar: new NavbarStore()
  });
};
