export interface LoginPayload {
  email?: string;
  password?: string;
}
export interface SignupPayload {
  username?: string;
  email?: string;
  password?: string;
}

export interface User {
  username?: string;
  email?: string;
  _id?: string;
}
