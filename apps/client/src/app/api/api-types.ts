import { GetUserDetailsResponse } from '../stores/types';

export interface IUser {
  data: GetUserDetailsResponse;
}

export interface IProfile{
  username:string;
  role:string;
  numRewards: number,
  numCourses:number,
  ranking:number
}