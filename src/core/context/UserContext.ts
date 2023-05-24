import { createContext } from 'react';
import { User } from '../localStorage/models/User.model';

export const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: (user: any) => {},
});
