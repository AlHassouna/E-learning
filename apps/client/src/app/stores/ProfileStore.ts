import { makeObservable, action, observable, computed } from 'mobx';
import StoreBase from './StoreBase';

import {
  GetUserDetailsResponse
} from './types';
import { getUser } from '../api/index';
import { IProfile } from '../api/api-types';


class ProfileStore extends StoreBase {
  private userDetailsResponse: IProfile | null | Partial<IProfile> = null;
  public username: string | null = null;
  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      userDetailsResponse: observable,
      // Actions
      getUserDetails: action,
    });
  }


  public getUserDetails = async (username: string | undefined): Promise<IProfile | null | Partial<IProfile>> => {
    try {
      this.rootStore.main.setLoading(true)
      const user = await getUser(username);
      this.userDetailsResponse = user;
      this.rootStore.main.setLoading(false);
      return user;
    } catch (err) {
      console.error(err);
      this.rootStore.main.setLoading(false);
      return null;
    }
  };

}

export default ProfileStore;
