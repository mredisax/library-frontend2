import { useEffect, useState } from 'react';
import { IBook } from '../../../../core/types/Book';
import axios from 'axios';
import { serverAddress } from '../../../../core/config/server';

export const useBooksData = () => {
  const [booksData, setBooksData] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBooksData = async (): Promise<IBook[]> => {
    const res = await axios.get(`${serverAddress}/books`, {
      validateStatus: (status) => status < 500,
    });

    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  };

  const refreshBooksData = () => {
    setIsLoading(true);

    fetchBooksData().then((res) => {
      setIsLoading(false);
      setBooksData(res);
    });
  };

  useEffect(() => {
    refreshBooksData();
  }, []);

  return { booksData, isLoading, refreshBooksData };
};
