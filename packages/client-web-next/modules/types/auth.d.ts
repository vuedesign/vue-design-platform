export interface User {
  id: number;
  uuid: string;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  password: string;
  avatar: string;
  status: number;
  rule: number;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  account: string;
  password: string;
}

export type AuthState = {
  user: User | null;
  token: string | null;
};
