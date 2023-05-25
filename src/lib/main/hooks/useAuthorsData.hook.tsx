import axios from 'axios';
import { useEffect, useState } from 'react';
import { serverAddress } from '../../../core/config/server';
import { IAuthor } from '../../../core/types/Author';

export const useAuthorsData = () => {
  const [authors, setAuthors] = useState<Array<IAuthor>>([]);

  const refreshAuthorsData = () => {
    axios.get(`${serverAddress}/authors`).then((res) => {
      setAuthors(res.data);
    });
  };

  useEffect(() => {
    refreshAuthorsData();
  }, []);

  const addAuthor = async (firstName: string, lastName: string) => {
    const res = await axios.post(
      `${serverAddress}/authors/add`,
      { first_name: firstName, last_name: lastName },
      {
        validateStatus: (status) => status < 500,
      }
    );

    if (res.status === 200) {
      refreshAuthorsData();
    }
  };

  return { authors, addAuthor };
};
