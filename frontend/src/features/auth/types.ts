
export type Credentials = {
  email: string;
  passwordHash: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface Response {
  message: string;
  data: {
    token: string;
    user: User;
  }
}

export type InitialState = {
  email: string;
  passwordHash: string;
}
