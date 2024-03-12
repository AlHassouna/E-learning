import { GetUserDetailsResponse } from '../stores/types';

export interface IUser {
  data: GetUserDetailsResponse;
}

export interface ICourse {
  id: string;
  title: string;
  description: string;
}
