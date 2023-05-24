import { useEffect, useState } from 'react';
import { User } from '../../../../core/localStorage/models/User.model';
import axios from 'axios';
import { serverAddress } from '../../../../core/config/server';

export const useUsersData = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUsersData = async (): Promise<User[]> => {
    const res = await axios.get(`${serverAddress}/users`, {
      validateStatus: (status) => status < 500,
    });

    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  };

  const refreshUserData = () => {
    setIsLoading(true);

    fetchUsersData().then((res) => {
      setIsLoading(false);
      setUsersData(res);
    });
  };

  const removeUser = async (userId: number) => {
    const res = await axios.delete(`${serverAddress}/users/${userId}`, {
      validateStatus: (status) => status < 500,
    });

    if (res.status === 200) {
      refreshUserData();
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  return { usersData, isLoading, refreshUserData, removeUser };
};

export const filterUser = (user: User, filter: string): boolean => {
  if (filter === '') return true;

  const filterLower = filter.toLowerCase();

  if (user.id?.toString().includes(filterLower)) return true;
  if (user.email.toLowerCase().includes(filterLower)) return true;
  if ((user.name + ' ' + user.lastname).toLowerCase().includes(filterLower))
    return true;

  return false;
};
