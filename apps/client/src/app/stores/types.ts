export interface GetUserDetailsResponse {
  id: string;
  username: string;
  email: string;
  role: string;
  status: boolean;

}

export interface LoginAsUserResponse {
  username: string;
  email: string;
  role: string;
  token: string;
  _id: string;
}

export interface UserPass {
  email: string;
  password: string;
}

export interface UserSign {
  username: string;
  email: string;
  password: string;
  role: string;
}
