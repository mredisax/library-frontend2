import axios from 'axios';
import { useEffect, useState } from 'react';
import { IAuthor } from '../../../../core/types/Author';
import { serverAddress } from '../../../../core/config/server';

export const useAuthorsData = () => {
  const [authors, setAuthors] = useState<Array<IAuthor>>([]);

  useEffect(() => {
    axios.get(`${serverAddress}/authors`).then((res) => {
      setAuthors(res.data);
    });
  }, []);

  return { authors };
};
