import { GetUserDetailsResponse } from '../stores/types';

export interface IUser {
  data: GetUserDetailsResponse;
}



export interface IContent{
  courseTitle: string
  content: string
  course: ICourse
}

export interface ICourse{
  courseName: string
  description: string
  teacher: IUser
  participants: IUser
  title : string
}


export interface IReward {
  user: string;
  type: string;
  timestamp: Date;
}
