import type{ RoleType } from "./roleType";

export type UserFormType = {
    id: number;
    email: string;
    password: string;
    name: string;
  };
  
  export type UserType = {
    id: number;
    email: string;
    name: string;
    Role: RoleType
  };
  
  export type AuthUserType =
    | { status: 'fetching' }
    | { status: 'success'; user: UserType }
    | { status: 'failed' };
  
  export type AuthActionType =
    | { type: 'SIGNUP'; payload: UserType }
    | { type: 'SIGNIN'; payload: UserType }
    | { type: 'AUTH_CHECKED'; payload: UserType }
    | { type: 'FAILED' }
    | { type: 'LOGOUT' };
  
  export type UserFormSignInType = {
    email: HTMLInputElement;
    password: HTMLInputElement;
  };
  
  export type UserFormSignUpType = {
    name: HTMLInputElement;
  } & UserFormSignInType;
  