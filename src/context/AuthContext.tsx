import { createContext, type Dispatch, type SetStateAction } from 'react';

export type AuthContextType = {
  accessToken: string | null;
  role: string;
  isLoggedIn: boolean;
  loading: boolean;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
