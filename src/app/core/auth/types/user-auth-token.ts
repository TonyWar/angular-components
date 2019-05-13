export interface UserAuthToken {
  userId: string;
  xAuthToken: string;
}

export const STORAGE_USER_TOKEN_KEY = 'userAuth';
export const AUTH_REPLACE_HEADER = 'needAuthHeader';
export const LOGOUT_ROUTE = '';
