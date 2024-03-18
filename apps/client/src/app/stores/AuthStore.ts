import { getItem, setItem, removeItem } from '../utils/localStorage';
import { action, computed, makeObservable, observable } from 'mobx';

import StoreBase from './StoreBase';

import { loginAsUser, setToken, signUp } from '../api/index';
import { LoginAsUserResponse, UserPass, UserSign } from './types';

class AuthStore extends StoreBase {
  public authMessage: string | null = null;
  public isLoadingResponse = false;
  private authResponse: LoginAsUserResponse | null = null;

  constructor() {
    super();

    makeObservable(this, {
      // Observables -
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      authResponse: observable,
      authMessage: observable,
      isLoadingResponse: observable,
      // Computeds -
      token: computed,
      isAuthenticated: computed,
      // Actions
      // XHR Actions
      setIsLoadingResponse: action,
      signup: action,
      login: action,
      logout: action
    });

    const authResponseFromLocalStorage = getItem('token');
    const authResponse = authResponseFromLocalStorage ? JSON.parse(authResponseFromLocalStorage) : null;

    if (authResponse) {
      this.authResponse = authResponse;
      setToken(authResponse.token);
    }
  }

  get token(): string | null {
    return this.authResponse?.token ?? null;
  }

  get isAuthenticated(): boolean {
    return Boolean(this.token);
  }

  public setIsLoadingResponse = (flag: boolean): void => {
    this.isLoadingResponse = flag;
  };
  public login = async (payload: UserPass): Promise<void> => {
    try {
      this.setIsLoadingResponse(true);
      const { token, username, email, role, _id } = await loginAsUser(payload);
      setToken(token);
      this.authResponse = { token, username, email, role, _id };
      setItem({
        key: 'token', value: JSON.stringify({
          token, username, email, role, _id
        })
      });
      this.setIsLoadingResponse(false);
    } catch (err: any) {
      this.authMessage = err.response.data.message;
      this.setIsLoadingResponse(false);
    }
  };

  public signup = async (payload: UserSign): Promise<void> => {

    try {
      this.setIsLoadingResponse(true);
      const { token, username, email, roleString: role, _id } = await signUp(payload);
      this.authResponse = { token, username, email, role, _id };
      setItem({
        key: 'token', value: JSON.stringify({
          token, username, email, role, _id
        })
      });
      this.setIsLoadingResponse(false);
    } catch (err: any) {
      console.error('error', err);
      this.authMessage = err.response.data.message;
      this.rootStore.main.setLoading(false);
    }
  };

  public logout = (): void => {
    this.authResponse = null;
    setToken('');
    removeItem('token');
  };
}

export default AuthStore;
