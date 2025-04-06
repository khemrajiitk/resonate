export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface SignInRes {
    token: string;
    user: User;
  }