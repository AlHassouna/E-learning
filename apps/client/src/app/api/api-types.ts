import { GetUserDetailsResponse } from '../stores/types';

export interface IUser {
  data: GetUserDetailsResponse;
}


export interface IContent {
  courseTitle: string;
  content: string;
  course: ICourse;
}

export interface ICourse {
  _id: string;
  courseName: string;
  description: string;
  teacher: IUser;
  participants: IUser;
  title: string;
}


export interface IReward {
  reward: any;
  user: string;
  type: string;
  timestamp: Date;
}


export interface IMessage {
  sender: string;
  receiver: string;
  msg: string;
  date: Date;
}

export interface IProfile{
  username:string;
  role:string;
  numRewards: number,
  numCourses:number,
  ranking:number
}