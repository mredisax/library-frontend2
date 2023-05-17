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

  const login = async (email: string, password: string): Promise<boolean> => {
    const res = await axios.post(
      `${serverAddress}/auth/login`,
      {
        email,
        password,
      },
      { validateStatus: (status) => status < 500 }
    );

    if (res.status === 200) {
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      return true;
    } else {
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    lastName: string,
    phone: string,
    address_id: string
  ): Promise<boolean> => {
    const res = await axios.post(
      `${serverAddress}/auth/register`,
      {
        email,
        password,
        name,
        lastName,
        phone,
        address_id,
      },
      { validateStatus: (status) => status < 500 }
    );

    if (res.status === 200) {
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      return true;
    } else {
      return false;
    }
  };

  const isUserLoggedIn = (): boolean => {
    return user !== null;
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return { user, login, register, logout };
};
