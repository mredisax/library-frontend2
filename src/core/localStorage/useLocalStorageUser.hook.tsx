import { useEffect, useState } from 'react';
import { User } from './models/User.model';
import axios from 'axios';
import { serverAddress } from '../config/server';

export const useLocalStorageUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user) as User);
    }
  }, []);

  const saveUserToLocalStorage = (user: User): void => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const isUserLoggedIn = (): boolean => {
    return user !== null;
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return { user, saveUserToLocalStorage, logout };
};
