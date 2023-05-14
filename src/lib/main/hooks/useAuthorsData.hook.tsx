import axios from 'axios';
import { useEffect, useState } from 'react';
import { serverAddress } from '../../../core/config/server';
import { IAuthor } from '../../../core/types/Author';

export const useAuthorsData = () => {
  const [authors, setAuthors] = useState<Array<IAuthor>>([]);

  useEffect(() => {
    axios.get(`${serverAddress}/authors`).then((res) => {
      setAuthors(res.data);
    });
  }, []);

  return { authors };
};
