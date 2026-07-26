import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { UserRole } from '../models/User.ts';

export type AuthContextType = {
  accessToken: string | null;
  role: UserRole | null;
  isLoggedIn: boolean;
  loading: boolean;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
