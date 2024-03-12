import { makeObservable, action, observable, computed } from 'mobx';
import StoreBase from './StoreBase';

import {
  GetUserDetailsResponse
} from './types';
import { getUser } from '../api/index';


class MainStore extends StoreBase {
  public isLoading = false;
  private userDetailsResponse: GetUserDetailsResponse | null = null;


  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      isLoading: observable,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      userDetailsResponse: observable,
      getUserDetails: action,
      // Actions
      start: action,
      setLoading: action
    });
  }

  public start = async (): Promise<void> => {
    this.setLoading(true);
    try {
      // const requests = [
      // this.getUserDetails()
      // ];
      // await Promise.all(requests);
      // console.log('This method is the begining of the app, the one that makes it all shiny');

      this.setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
      this.setLoading(false);
    }
  };

  public getUserDetails = async (_id: string): Promise<void> => {
    try {
      // @ts-ignore
      const { data } = getUser(_id);
      this.userDetailsResponse = data;
    } catch (err) {
      console.error(err);
    }
  };

  public setLoading = (flag: boolean): void => {
    this.isLoading = flag;
  };

}

export default MainStore;
